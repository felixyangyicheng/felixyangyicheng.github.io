using Capybara.Models;
using Microsoft.JSInterop;
using System.Net.Http;

namespace Capybara.Pages.GuessDogBreed
{
    public partial class GuessDogBreedPage
    {
         
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
        public IndividualLetterComboInput input { get; set; } = new();
 
        public int Points { get; set; } = 0;
        protected override async Task OnInitializedAsync()
        {
#if DEBUG
            string rootPath = configuration.GetValue<string>("rootPath") ?? throw new ArgumentNullException(nameof(rootPath));
#else
        string rootPath = configuration.GetValue<string>("githubLink") ?? throw new ArgumentNullException(nameof(rootPath));
#endif
            var response = _httpClient.GetFromJsonAsync<List<DogBreedModel>>($"{rootPath}/dog_breeds.json");

            DogBreeds = await response;
            DogBreedsViewed = new();
            if (DogBreeds != null)
            {
                ListToGuess = DogBreeds.OrderBy(x => Random.Shared.Next()).Take(10).ToList();
                if (ListToGuess.Count > 0)
                {

                    NewQuaternary();
                }
            }
            await base.OnInitializedAsync();
        }
        private async Task NewGame()
        {
            await OnInitializedAsync();
        }
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            await JSRuntime.InvokeVoidAsync("ScrollToBottom", "viewed");

        }
        private async Task NextDogBreed(bool correctGuess)
        {
            if (correctGuess)
            {
                Points += 10;

            }
            else
            {
                Decrement();
            }
            if (ListToGuess != null && ListToGuess.Count > 0)
            {
                DogBreedResult result = new();
                result.BreedName = DogBreedToGuess.BreedName;
                result.ImageUrl = DogBreedToGuess.ImageUrl;
                result.Correct = correctGuess;
                DogBreedsViewed?.Add(result);
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
            List<DogBreedModel> wrong = DogBreeds.OrderBy(x => Random.Shared.Next()).Where(a => a.BreedName!= DogBreedToGuess.BreedName).Take(3).ToList();
            foreach (var i in wrong)
            {
                DogBreedPropose dogBreedPropose = new();
                dogBreedPropose.BreedName = i.BreedName;
                dogBreedPropose.Correct = false;
                DogBreedQuaternary.DogBreedProposes.Add(dogBreedPropose);
            }
            DogBreedPropose dogBreedProposeCorrect = new();
            dogBreedProposeCorrect.Correct = true;
            dogBreedProposeCorrect.BreedName = DogBreedToGuess.BreedName;
            DogBreedQuaternary.DogBreedProposes.Add(dogBreedProposeCorrect);
            DogBreedQuaternary.DogBreedProposes.OrderBy(x => Random.Shared.Next()).ToList();
            StateHasChanged();
        }
        private void Decrement()
        {
            Points -= 10;
        }
    }
}
