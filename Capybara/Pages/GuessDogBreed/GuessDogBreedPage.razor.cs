

namespace Capybara.Pages.GuessDogBreed
{
	public partial class GuessDogBreedPage
	{
		[Inject, NotNull] IDialogService? DialogService { get; set; }
		[Inject, NotNull] IConfiguration? configuration { get; set; }

		[NotNull]
		public List<DogBreedModel>? DogBreeds { get; set; }
		[NotNull]
		public List<DogBreedModel>? ListToGuess { get; set; } = new List<DogBreedModel>();
		public List<DogBreedResult>? DogBreedsViewed { get; set; } = new List<DogBreedResult>();
		[NotNull]
		public DogBreedQuaternary DogBreedQuaternary { get; set; } = new();
		public DogBreedModel DogBreedToGuess { get; set; } = new();

		private List<StatisticModel> GuessResult { get; set; } = new();

		private ApexChart<StatisticModel> _barChart { get; set; } = default!;

		private ApexChartOptions<StatisticModel> _barCharOptions { get; set; } = new ApexChartOptions<StatisticModel>
		{
			Theme = new Theme
			{
				Mode = Mode.Light,
				Palette = PaletteType.Palette6
			}
		};

		protected bool loading { get; set; }
		protected int TotalGuess { get; set; } = 15;


		protected override async Task OnInitializedAsync()
		{


			await base.OnInitializedAsync();
		}
		private async Task NewGame()
		{

			loading = true;
#if DEBUG
			string rootPath = configuration.GetValue<string>("rootPath") ?? throw new ArgumentNullException(nameof(rootPath));
#else
        string rootPath = configuration.GetValue<string>("githubLink") ?? throw new ArgumentNullException(nameof(rootPath));
#endif

			DogBreeds = await _httpClient.GetFromJsonAsync<List<DogBreedModel>>($"{rootPath}/races_chien.json");
			DogBreedsViewed = new();
			if (DogBreeds != null)
			{
				ListToGuess = DogBreeds.OrderBy(x => Random.Shared.Next()).Take(TotalGuess).ToList();
				if (ListToGuess.Count > 0)
				{
					NewQuaternary();
				}
			}
			loading = false;

		}
		protected override async Task OnAfterRenderAsync(bool firstRender)
		{
			await base.OnAfterRenderAsync(firstRender);
		}
		private async Task NextDogBreed(bool correctGuess)
		{

			if (ListToGuess != null && ListToGuess.Count > 0)
			{
				DogBreedResult result = new();
				result.BreedName = DogBreedToGuess.BreedName;
				result.ImageUrl = DogBreedToGuess.ImageUrl;
				result.Correct = correctGuess;
				result.Order = ListToGuess.Count;
				DialogOptions options = new DialogOptions() { MaxWidth = MaxWidth.Medium, FullWidth = true, Position = DialogPosition.TopCenter };
				var parameters = new DialogParameters<ChoiceResultDialog>();
				parameters.Add(x => x.Result, result);
				var dialog = await DialogService.ShowAsync<ChoiceResultDialog>("Result", parameters, options);
				var r = await dialog.Result;
				DogBreedsViewed?.Add(result);
				DogBreedsViewed = DogBreedsViewed?.OrderBy(x => x.Order).ToList();


				StatisticModel stat = new StatisticModel { Title = "Résultat" };


				stat.Ok = DogBreedsViewed?.Count(x => x.Correct == true);
				stat.Ko = DogBreedsViewed?.Count(x => x.Correct == false);
				GuessResult.Clear();
				GuessResult.Add(stat);


				ListToGuess.RemoveAt(0);
				StateHasChanged();
				if (ListToGuess.Count > 0)
				{
					NewQuaternary();
				}
				else
				{
					DialogOptions o = new DialogOptions() { MaxWidth = MaxWidth.Medium, FullWidth = true, Position = DialogPosition.TopCenter };
					var p = new DialogParameters<ResultChartDialog>();
					p.Add(x => x.GuessResult, GuessResult);
					var d = await DialogService.ShowAsync<ResultChartDialog>("Result", p, o);

					DogBreedToGuess = new DogBreedModel(); // Or handle end of list case
				}
			}

			StateHasChanged();
		}

		private void NewQuaternary()
		{
			DogBreedQuaternary.DogBreedProposes = new();
			DogBreedToGuess = ListToGuess[0];
			DogBreedPropose dogBreedProposeCorrect = new();
			dogBreedProposeCorrect.Correct = true;
			dogBreedProposeCorrect.BreedName = DogBreedToGuess.BreedName;

			List<DogBreedModel> wrong = DogBreeds.OrderBy(_ => Guid.NewGuid())
				.Where(a => a.BreedName != DogBreedToGuess.BreedName && a.Type == DogBreedToGuess.Type)
				.Take(3)
				.ToList();
			foreach (var i in wrong)
			{
				DogBreedPropose dogBreedPropose = new();
				dogBreedPropose.BreedName = i.BreedName;
				dogBreedPropose.Correct = false;

				DogBreedQuaternary.DogBreedProposes.Add(dogBreedPropose);
			}


			DogBreedQuaternary.DogBreedProposes.Add(dogBreedProposeCorrect);
			DogBreedQuaternary.DogBreedProposes = DogBreedQuaternary.DogBreedProposes.OrderBy(_ => Guid.NewGuid()).ToList();
			StateHasChanged();
		}




	}
}
