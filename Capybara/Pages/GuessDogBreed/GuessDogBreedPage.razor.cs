using ApexCharts;
using Capybara.Components.Dialogs;
using Capybara.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.JSInterop;
using System.Diagnostics;
using System.Net.Http;

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
        public Random rnd { get; set; } = new Random();

        private ApexChart<List<DogBreedResult>> chart { get; set; } = new();
        private DogBreedResult[] _radialData = default!;
        private ApexChart<DogBreedResult> _radialChart = default!;

        private ApexChartOptions<List<DogBreedResult>> options { get; set; } = new();
        public bool loading { get; set; }

        public class StatisticModel
        {
            public decimal Percentage { get; set; }
            public string Title { get; set; } = "";
        }

        public StatisticModel statistic { get; set; } = new();
        protected override async Task OnInitializedAsync()
        {
            loading=true;
#if DEBUG
            string rootPath = configuration.GetValue<string>("rootPath") ?? throw new ArgumentNullException(nameof(rootPath));
#else
        string rootPath = configuration.GetValue<string>("githubLink") ?? throw new ArgumentNullException(nameof(rootPath));
#endif
            var response = _httpClient.GetFromJsonAsync<List<DogBreedModel>>($"{rootPath}/races_chien.json");
            _radialData = new DogBreedResult[1] {new()};
            DogBreeds = await response;
            DogBreedsViewed = new();
            if (DogBreeds != null)
            {
                ListToGuess = DogBreeds.OrderBy(x => Random.Shared.Next()).Take(15).ToList();
                if (ListToGuess.Count > 0)
                {
                    NewQuaternary();
                }
            }
            loading = false;

            await base.OnInitializedAsync();
        }
        private async Task NewGame()
        {
            await OnInitializedAsync();
        }
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            // await JSRuntime.InvokeVoidAsync("ScrollToBottom", "viewed");
           // await chart.UpdateOptionsAsync(true, true, false);

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
                result.Order=ListToGuess.Count;
                DialogOptions options = new DialogOptions() { MaxWidth = MaxWidth.Medium, FullWidth = true,  Position = DialogPosition.TopCenter };
                var parameters = new DialogParameters<ChoiceResultDialog>();
                parameters.Add(x => x.Result, result);
                var dialog = await DialogService.ShowAsync<ChoiceResultDialog>("Result",  parameters, options);
                var r = await dialog.Result;
                DogBreedsViewed?.Add(result);
                DogBreedsViewed=DogBreedsViewed?.OrderBy(x => x.Order).ToList();

 /// chart does not update !!!!
                _radialData.Append( result);
                await _radialChart.UpdateSeriesAsync();
                await _radialChart.UpdateOptionsAsync(true, true, false);

/// chart does not update !!!!
//todo update chart
                ListToGuess.RemoveAt(0);
                StateHasChanged();
                if (ListToGuess.Count > 0)
                {
                    NewQuaternary();
                }
                else
                {
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
      
            List<DogBreedModel> wrong = DogBreeds.OrderBy(x => Random.Shared.Next())
                .Where(a => a.BreedName!= DogBreedToGuess.BreedName&&a.Type==DogBreedToGuess.Type)
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
            DogBreedQuaternary.DogBreedProposes.OrderBy(x => Random.Shared.Next()).ToList();
            StateHasChanged();
        }

        private ApexChartOptions<DogBreedResult> _radialChartOptions = new ApexChartOptions<DogBreedResult>
        {
            PlotOptions = new()
            {

                RadialBar = new()
                {
                    StartAngle = -135,
                    EndAngle = 135
                }
            },
            Stroke = new()
            {
                DashArray = 4
            },
            Chart = new Chart
            {
                Animations = new()
                {
                    Enabled = true,
                    Easing = Easing.Linear,
                    DynamicAnimation = new()
                    {
                        Speed = 1100
                    }
                }
            }
        };

    }
}
