using Microsoft.Extensions.Configuration;
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

        public FlagModel RegionToGuess { get; set; } = new();

        public int Points { get; set; } = 10;
        protected override async Task OnInitializedAsync()
        {
#if DEBUG
            string rootPath = configuration.GetValue<string>("rootPath") ?? throw new ArgumentNullException(nameof(rootPath));
#else
        string rootPath = configuration.GetValue<string>("githubLink") ?? throw new ArgumentNullException(nameof(rootPath));
#endif
            var response = _httpClient.GetFromJsonAsync<List<FlagModel>>($"{rootPath}/place_flags.json");

            regionAndFlags =await response;
            Random rnd = new Random();
            if (regionAndFlags!=null)
            {
                RegionToGuess = regionAndFlags[rnd.Next(regionAndFlags.Count)];
                //Console.WriteLine(RegionToGuess.Region);
            }
            await base.OnInitializedAsync();
        }

        private void nextFlag(bool ok)
        {
            Points = Points + 10;
            Random rnd = new Random();
            if (ok) {
                RegionToGuess = regionAndFlags[rnd.Next(regionAndFlags.Count)];
            }
            StateHasChanged();
        }

        private void Decrement()
        {
            Points = Points - 10;
            StateHasChanged();
        }
    }
}
