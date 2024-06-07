using Microsoft.Extensions.Configuration;
using Microsoft.JSInterop;
using System.Collections;
using System.Net.Http;
using System.Text.Json;
using static MudBlazor.Colors;

namespace Capybara.Pages.GuessFlags
{
    public partial class GuessFlag
    {
        [Inject, NotNull] IConfiguration? configuration { get; set; }

        [NotNull]
        public List<FlagModel>? regionAndFlags { get; set; }
        [NotNull]
        public List<FlagModel>? ListToGuess { get; set; } = new List<FlagModel>();
        public List<FlagModel>? FlagsViewed { get; set; }=new List<FlagModel>();
        [NotNull]

        public FlagModel RegionToGuess { get; set; } = new();
        public Random rnd { get; set; } = new Random();
        public IndividualLetterComboInput input { get; set; } = new();

        public int Points { get; set; } = 0;
        protected override async Task OnInitializedAsync()
        {
            //await NewGame();
            await base.OnInitializedAsync();
        }
        private async Task NewGame()
        {
#if DEBUG
            string rootPath = configuration.GetValue<string>("rootPath") ?? throw new ArgumentNullException(nameof(rootPath));
#else
        string rootPath = configuration.GetValue<string>("githubLink") ?? throw new ArgumentNullException(nameof(rootPath));
#endif
            var response = _httpClient.GetFromJsonAsync<List<FlagModel>>($"{rootPath}/place_flags.json");

            regionAndFlags = await response;
            FlagsViewed = new();
            if (regionAndFlags != null)
            {
                ListToGuess = regionAndFlags.OrderBy(_ => Guid.NewGuid()).Take(10).ToList();
                if (ListToGuess.Count > 0)
                {
                    RegionToGuess = ListToGuess[0];
                }
            }
        }
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            await JSRuntime.InvokeVoidAsync("ScrollToBottom", "viewed");

        }
        private void NextFlag(bool correctGuess)
        {
            if (correctGuess)
            {
                Points += 10;
                if (ListToGuess != null && ListToGuess.Count > 0)
                {
                    FlagsViewed?.Add(RegionToGuess);
                    ListToGuess.RemoveAt(0);
                    StateHasChanged();
                    if (ListToGuess.Count > 0)
                    {
                        RegionToGuess = ListToGuess[0];
                    }
                    else
                    {
                        RegionToGuess = new FlagModel(); // Or handle end of list case
                    }
                }
            }


            StateHasChanged();
        }

        private void Decrement()
        {
            Points -= 10;
            StateHasChanged();
        }
    }
}
