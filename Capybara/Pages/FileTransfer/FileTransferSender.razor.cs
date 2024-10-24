namespace Capybara.Pages.FileTransfer
{
    public partial class FileTransferSender
    {
        private bool _isClosePage = false;
        private int _roomId;
        private bool _isLoading = false;
        private string _loadingMessage = "";
        private string _qrValue = "";

        private bool _isReceiverJoined = false;
        private ConnectionTypeEnum _connectionType = ConnectionTypeEnum.None;

        private HubConnection _hub = null!;
        private DotNetObjectReference<FileTransferSender> _objRef = null!;

        private readonly List<FileTransferInfo> _files = new List<FileTransferInfo>();

        private readonly SemaphoreSlim _fileQueueSlim = new(1, 3); // used to be 1,1 
        private readonly ConcurrentQueue<FileTransferInfo> _fileQueue = new ConcurrentQueue<FileTransferInfo>();

        protected ElementReference UploadElement { get; set; }
        protected InputFile? inputFile { get; set; }


        protected class UploadModel
        {
            public int Progress { get; set; } = 0;
            public bool Uploaded { get; set; } = false;
            public bool Deleted { get; set; }

            public string Name { get; set; } = "";

            public DateTimeOffset LastModified { get; set; }

            public long Size { get; set; }

            public string ContentType { get; set; } = "";
            public byte[] Content { get; set; } = [];

        }

      


        protected override async Task OnParametersSetAsync()
        {
            await base.OnInitializedAsync();
            System.Console.WriteLine($"Préparation à l'initialisation de la salle....");
            _objRef = DotNetObjectReference.Create(this);


			_hub = new HubConnectionBuilder()
	           .WithUrl($"{Configuration["fileshare.srv"]}/file-transfer-hub").WithAutomaticReconnect()
	           .Build();

			_hub.On("ReceiverJoin", async () =>
            {
                System.Console.WriteLine("Entrée du destinataire");
                _isReceiverJoined = true;
                await InvokeAsync(StateHasChanged);
                await JSRuntime.InvokeVoidAsync("createSenderConnection");
            });

            _hub.On<string>("ReceiveReceiverIceCandidate", async (candidate) =>
            {
                System.Console.WriteLine("Réception des informations sur le candidat de la partie destinataire");
                await InvokeAsync(StateHasChanged);
                await JSRuntime.InvokeVoidAsync("receiveIceCandidate", candidate);
            });

            _hub.On<string>("ReceiveAnswer", async (answer) =>
            {
                System.Console.WriteLine("Réception de l'instruction de réponse du canal réseau");
                await JSRuntime.InvokeVoidAsync("receiveAnswer", answer);
                await InvokeAsync(StateHasChanged);
            });
            await _hub.StartAsync();

            await JSRuntime.InvokeVoidAsync("initialization", _objRef, Configuration["StunServer"]);

            _roomId = await _hub.InvokeAsync<int>("CreateRoom");
            _qrValue = $"{NavigationManager.BaseUri}file-transfer/receiver/{_roomId}";

            System.Console.WriteLine("En attente de l'arrivée du destinataire....");
            await Task.Factory.StartNew(StartSendFileQueueAsync2, TaskCreationOptions.LongRunning);
        }
        protected async Task OnChange(InputFileChangeEventArgs e)
        {

            var fileList = e.GetMultipleFiles(e.FileCount);
    
            var tasks = fileList.Select(async f => await OnSubmit(f));
            await Task.WhenAll(tasks);
        }

        protected async Task OnSubmit(IBrowserFile efile)
        {
            await LoadingAsync("Traitement du fichier en cours...");

            if (efile == null) return;

            var file = new FileTransferInfo();
            file.FileName = efile.Name;
            var ms = new MemoryStream();
            // await efile.OpenReadStream(512000 * 1000).CopyToAsync(ms);
            // var buffer = ms.ToArray();
            var buffer = new byte[1024 * 512];



            file.UploadProgress = 0;

            int count;
            int totalCount = 0;
            using var stream = efile.OpenReadStream(512000*1000);
            var finalBuffer = new byte[stream.Length];

            while ((count = await stream.ReadAsync(buffer, 0, buffer.Length)) != 0)
            {
                Buffer.BlockCopy(buffer, 0, finalBuffer, totalCount, count);
                totalCount += count;
                file.UploadProgress = (int)(totalCount * 100.0 / stream.Length);
                StateHasChanged();
            }

            file.FileContext = new List<byte>(buffer);
            file.FileSize = buffer.Length;
            var hashService = HashServiceFactory.Create(HashTypeEnum.SHA1);
            file.SHA1 = await hashService.ComputeHashAsync(buffer, false);
            _files.Add(file);
            StateHasChanged();

            await LoadingCompletedAsync();
        }
        [JSInvokable]
        public async Task SendIceCandidateToServer(string candidate)
        {
            System.Console.WriteLine("Prêt à envoyer les informations du candidat....");
            var result = await _hub.InvokeAsync<string>("SendSenderIceCandidate", candidate);
            System.Console.WriteLine($"réponse du serveur:{result}");
        }

        [JSInvokable]
        public async Task SendOfferToServer(string offer)
        {
            System.Console.WriteLine("Prêt à envoyer l'instruction de demande de canal réseau....");
            var result = await _hub.InvokeAsync<string>("SendOffer", offer);
            System.Console.WriteLine($"réponse du serveur:{result}");
        }

        [JSInvokable]
        public async Task SenderConnected()
        {
            //envoi est pret
            _connectionType = ConnectionTypeEnum.WebRTC;
            await InvokeAsync(StateHasChanged);
        }

        public async Task EnableServiceRelay()
        {
            _connectionType = ConnectionTypeEnum.ServiceRelay;
            var result = await _hub.InvokeAsync<string>("SwitchConnectionType");
            System.Console.WriteLine($"réponse du serveur:{result}");
            await InvokeAsync(StateHasChanged);
        }

        private async void UploadFiles(IReadOnlyList<IBrowserFile> browserFiles)
        {
         
            IList<IBrowserFile> files = new List<IBrowserFile>();

            foreach (var browserFile in browserFiles)
            {
                if (_files.Any(x => x.FileName == browserFile.Name))
                {
                    var options = new DialogOptions()
                    {
                        NoHeader = true
                    };
                    var parameters = new DialogParameters();
                    parameters.Add("ContentText", "Impossible d'ajouter le fichier de façon répétée");
                    await Dialog.ShowAsync<DialogOk>("Avertissement", parameters, options);
                    return;
                }
                files.Add(browserFile);
            }

            await LoadingAsync("Traitement du fichier en cours...");
            var uploadTasks = browserFiles.Select(async file => await OnUploadReadStreamAsync(file));
            await Task.WhenAll(uploadTasks);
            await LoadingCompletedAsync();
        }

        protected async Task OnUploadReadStreamAsync(IBrowserFile f)
        {
            long maxFileSize = 100000000;
            if (f.Size >= maxFileSize)
            {
                var options = new DialogOptions()
                {
                    NoHeader = true
                };
                var parameters = new DialogParameters();
                parameters.Add("ContentText", $"La taille du fichier {f.Name} dépasse la limite du système");
				await Dialog.ShowAsync<DialogOk>("Avertissement", parameters, options);
                return;
            }
            var file = new FileTransferInfo();
            file.FileName = f.Name;
            var ms = new MemoryStream();
            await f.OpenReadStream(maxFileSize).CopyToAsync(ms);
            var buffer = ms.ToArray();
            file.FileContext = new List<byte>(buffer);
            file.FileSize = buffer.Length;
            var hashService = HashServiceFactory.Create(HashTypeEnum.SHA1);
            file.SHA1 = await hashService.ComputeHashAsync(buffer, false);
            _files.Add(file);
            Snackbar.Add($"{file.FileName} ajouté", Severity.Info);
        }
        private async Task SendFileAsync(string fileName)
        {
            var file = _files.First(x => x.FileName == fileName);
            if (file.State != FileTransferStateEnum.Init)
            {
                return;
            }
            file.State = FileTransferStateEnum.Queue;
            _fileQueue.Enqueue(file);
            await InvokeAsync(StateHasChanged);
        }

        private async Task SendAllFilesAsync()
        {
            _files.Sort((x, y) => x.FileSize.CompareTo(y.FileSize));
			foreach (var file in _files)
            {
                if (file.State != FileTransferStateEnum.Init)
                {
                    continue;
                }
                file.State = FileTransferStateEnum.Queue;
                _fileQueue.Enqueue(file);
              
            }
            await InvokeAsync(StateHasChanged);
        }
		private async Task StartSendFileQueueAsync()
		{
			var tasks = new List<Task>();

			while (!_isClosePage)
			{
				while (_fileQueue.TryDequeue(out var file))
				{
					// Limit the number of concurrent uploads using SemaphoreSlim
					await _fileQueueSlim.WaitAsync();

					tasks.Add(SendFileAsync(file));
				}

				if (tasks.Count > 0)
				{
					// Wait for all tasks to complete before dequeuing more files
					await Task.WhenAll(tasks);
					tasks.Clear();
				}

				await Task.Delay(2); // Give time for additional files to be added
			}
		}
		private async Task SendFileAsync(FileTransferInfo file)
		{
			try
			{
				file.State = FileTransferStateEnum.Sending;

				FileMetadata fileMetadata = file as FileMetadata;

				if (_connectionType == ConnectionTypeEnum.WebRTC)
				{
					// Send file metadata first
					await JSRuntime.InvokeVoidAsync("sendFileInfo", JsonSerializer.Serialize(fileMetadata));

					// Send the actual file data in chunks
					await JSRuntime.InvokeVoidAsync("sendFile", file.FileContext.ToArray());
				}
				else if (_connectionType == ConnectionTypeEnum.ServiceRelay)
				{
					// Send file metadata to the server
					await _hub.InvokeAsync("SendFileInfo", JsonSerializer.Serialize(fileMetadata));

					// Send the file data via SignalR
					await SendFileWithSignalRAsync(file);
				}

				file.State = FileTransferStateEnum.Sent;
			}
			finally
			{
				// Release the semaphore slot when the file is sent
				_fileQueueSlim.Release();
			}
		}
		private async Task SendFileWithSignalRAsync(FileTransferInfo file)
		{
			int totalBytesSent = 0;

			for (int offset = 0; offset < file.FileContext.Count; offset += _chunkSize)
			{
				int remainingBytes = file.FileContext.Count - offset;
				int chunkToSend = Math.Min(_chunkSize, remainingBytes);
				byte[] chunk = new byte[chunkToSend];
				file.FileContext.CopyTo(offset, chunk, 0, chunkToSend);

				// Send the chunk via SignalR
				await _hub.InvokeAsync("SendFile", chunk);

				totalBytesSent += chunkToSend;
				file.TransferProgress = (double)totalBytesSent / file.FileContext.Count * 100;

				await InvokeAsync(StateHasChanged);
				await Task.Delay(10); // Optional delay to control pacing
			}

			await _hub.InvokeAsync("SendFileSent");
		}
		private async Task StartSendFileQueueAsync2()
        {
            while (!_isClosePage)
            {
                while (_fileQueue.TryDequeue(out var file))
                {
                    await _fileQueueSlim.WaitAsync();
			

					_files.First(x => x.FileName == file.FileName).State = FileTransferStateEnum.Sending;
                    FileMetadata fileMetadata = file as FileMetadata;
                    if (_connectionType == ConnectionTypeEnum.WebRTC)
                    {
                        await JSRuntime.InvokeVoidAsync("sendFileInfo", JsonSerializer.Serialize(fileMetadata));
                        await JSRuntime.InvokeVoidAsync("sendFile", file.FileContext.ToArray());
                    }
                    else if (_connectionType == ConnectionTypeEnum.ServiceRelay)
                    {
                        await _hub.InvokeAsync("SendFileInfo", JsonSerializer.Serialize(fileMetadata));
                        await SendFileWithSignalRAsync();
                    }
                    await InvokeAsync(StateHasChanged);
                    await Task.Delay(1);

                
                }
                await Task.Delay(2);

            }
        }

        private int _chunkSize = 16384;
        private async Task SendFileWithSignalRAsync()
        {
            var file = _files.First(x => x.State == FileTransferStateEnum.Sending);
            int totalBytesSent = 0;

            for (int offset = 0; offset < file.FileContext.Count; offset += _chunkSize)
            {
                int remainingBytes = file.FileContext.Count - offset;
                int chunkToSend = Math.Min(_chunkSize, remainingBytes);
                byte[] chunk = new byte[chunkToSend];
                file.FileContext.CopyTo(offset, chunk, 0, chunkToSend);

                await _hub.InvokeAsync("SendFile", chunk);

                totalBytesSent += chunkToSend;
                file.TransferProgress = (double)totalBytesSent / file.FileContext.Count * 100; ;

                await InvokeAsync(StateHasChanged);
                await Task.Delay(10);
            }
            await _hub.InvokeAsync("SendFileSent");
            file.State = FileTransferStateEnum.Sent;
            _fileQueueSlim.Release();
        }

        [JSInvokable]
        public async Task FileSending(int length)
        {
            var file = _files.First(x => x.State == FileTransferStateEnum.Sending);
            file.TransferProgress = (double)(file.FileSize - length) / file.FileSize * 100;
            await InvokeAsync(StateHasChanged);
        }

        [JSInvokable]
        public async Task FileSent()
        {
            _files.First(x => x.State == FileTransferStateEnum.Sending).State = FileTransferStateEnum.Sent;
            _fileQueueSlim.Release();
            await InvokeAsync(StateHasChanged);
        }

        private async Task LoadingAsync(string message)
        {
            _isLoading = true;
            _loadingMessage = message;
            await InvokeAsync(StateHasChanged);
        }
        private async Task LoadingCompletedAsync()
        {
            _isLoading = false;
            _loadingMessage = "";
            await InvokeAsync(StateHasChanged);
        }

        public void Dispose()
        {
            _isClosePage = true;
            _objRef?.Dispose();
        }
 
    }
}
