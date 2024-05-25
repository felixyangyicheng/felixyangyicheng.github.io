using System.Collections;
using System.Text.Json;

namespace Capybara.Pages.GuessFlags
{
    public partial class GuessFlag
    {
        [NotNull]
        public List<FlagModel>? regionAndFlags { get; set; } = new();
        [NotNull]

        public FlagModel RegionToGuess { get; set; } = new();

        protected override async Task OnInitializedAsync()
        {
            regionAndFlags=JsonSerializer.Deserialize<List<FlagModel>>(File.ReadAllText("./place_flags.json"));
            Random rnd = new Random();
            if (regionAndFlags!=null)
            {
                RegionToGuess = regionAndFlags[rnd.Next(regionAndFlags.Count)];
            }
            await base.OnInitializedAsync();
        }
    }
}
