

namespace Capybara.Pages.FileTransfer
{
    public partial class FileTransferReceiver
    {
        [Parameter]
        public int RoomId { get; set; }

        private ConnectionTypeEnum _connectionType = ConnectionTypeEnum.None;

        private HubConnection _hub = null!;
        private DotNetObjectReference<FileTransferReceiver> _objRef = null!;

        private readonly List<FileTransferInfo> _files = new List<FileTransferInfo>();

        protected override async Task OnParametersSetAsync()
        {
            await base.OnInitializedAsync();
            System.Console.WriteLine($"Préparation à l'initialisation du module....");
            _objRef = DotNetObjectReference.Create(this);

            _hub = new HubConnectionBuilder()
                .WithUrl($"{Configuration["fileshare.srv"]}/file-transfer-hub")
                .Build();

            _hub.On<string>("ReceiveSenderIceCandidate", async (candidate) =>
            {
                System.Console.WriteLine("Reception des informations sur le candidat de l'émetteur");
                await InvokeAsync(StateHasChanged);
                await JSRuntime.InvokeVoidAsync("receiveIceCandidate", candidate);
            });

            _hub.On<string>("ReceiveOffer", async (offer) =>
            {
                System.Console.WriteLine("Réception de l'instruction de demande de canal réseau");
                await InvokeAsync(StateHasChanged);
                await JSRuntime.InvokeVoidAsync("createReceiverConnection", offer);
            });
            _hub.On("ReceiveSwitchConnectionType", async () =>
            {
                //Basculer en mode de transfert intermédiaire via le serveur
                _connectionType = ConnectionTypeEnum.ServiceRelay;
                await InvokeAsync(StateHasChanged);
            });
            _hub.On<string>("ReceiveFileInfo", async (fileInfo) =>
            {
                await OnReceiveFileInfo(fileInfo);
            });
            _hub.On<byte[]>("ReceiveFile", async (buffer) =>
            {
                await OnFileReceivingAsync(buffer);
            });
            _hub.On("ReceiveFileSent", async () =>
            {
                await OnFileReceived();
            });

            await _hub.StartAsync();
            await JSRuntime.InvokeVoidAsync("initialization", _objRef, Configuration["StunServer"]);

            var result = await _hub.InvokeAsync<string>("JoinRoom", RoomId);
            if (result != "ok")
            {
                await Dialog.ShowMessageBox("Avertissement", result, yesText: "Confirmer");
                NavigationManager.NavigateTo($"/file-transfer");
                return;
            }
        }

        [JSInvokable]
        public async Task SendIceCandidateToServer(string candidate)
        {
            System.Console.WriteLine("Prêt à envoyer les informations du candidat....");
            var result = await _hub.InvokeAsync<string>("SendReceiverIceCandidate", candidate);
            System.Console.WriteLine($"Réponse du serveur:{result}");
        }

        [JSInvokable]
        public async Task SendAnswerToServer(string answer)
        {
            System.Console.WriteLine("Prêt à envoyer l'instruction de réponse du canal réseau....");
            var result = await _hub.InvokeAsync<string>("SendAnswer", answer);
            System.Console.WriteLine($"Réponse du serveur:{result}");
            await InvokeAsync(StateHasChanged);
        }

        [JSInvokable]
        public async Task ReceiverConnected()
        {
            //receiver ready
            _connectionType = ConnectionTypeEnum.WebRTC;
            await InvokeAsync(StateHasChanged);
        }

        [JSInvokable]
        public async Task FileReceivingWithWebRTC(byte[] buffer)
        {
            await OnFileReceivingAsync(buffer);
        }

        [JSInvokable]
        public async Task FileInfoReceived(string fileInfo)
        {
            await OnReceiveFileInfo(fileInfo);
        }

        private async Task OnReceiveFileInfo(string fileInfo)
        {
            var file = fileInfo.ToObject<FileTransferInfo>();
            if (file == null)
            {
                return;
            }
            file.FileContext = new List<byte>();
            file.State = FileTransferStateEnum.Sending;
            _files.Add(file);
            await InvokeAsync(StateHasChanged);
        }

        [JSInvokable]
        public async Task FileReceivedWithWebRTC()
        {
            await OnFileReceived();
        }

        private async Task OnFileReceivingAsync(byte[] buffer)
        {
            var file = _files.First(x => x.State == FileTransferStateEnum.Sending);
            file.FileContext.AddRange(buffer);
            file.TransferProgress = (double)file.FileContext.Count / file.FileSize * 100;
            await InvokeAsync(StateHasChanged);
        }

        private async Task OnFileReceived()
        {
            var file = _files.First(x => x.State == FileTransferStateEnum.Sending);
            var sha1 = await HashServiceFactory.Create(HashTypeEnum.SHA1).ComputeHashAsync(file.FileContext.ToArray(), false);
            if (file.SHA1 != sha1)
            {
                file.Message = "Échec de la vérification du fichier";
                file.Succeed = false;
            }
            else
            {
                file.Succeed = true;
            }
            file.State = FileTransferStateEnum.Sent;
            await InvokeAsync(StateHasChanged);
        }

        private async Task DownloadFileAsync(string fileName)
        {
            await JSRuntime.InvokeVoidAsync("saveToFileWithBufferAndName", fileName, _files.First(x => x.FileName == fileName).FileContext.ToArray());
        }

        public void Dispose()
        {
            _objRef?.Dispose();
        }
    }
}
