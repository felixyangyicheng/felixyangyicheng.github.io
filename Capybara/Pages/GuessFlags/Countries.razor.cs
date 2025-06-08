using static System.Net.WebRequestMethods;

namespace Capybara.Pages.GuessFlags
{
    public partial class Countries
    {
        #region DI
        [Inject, NotNull] IConfiguration? configuration { get; set; }

        #endregion
        #region Properties
        [NotNull]
        public List<FlagModel>? countryAndFlags { get; set; } = new List<FlagModel>();
        [NotNull]
        public List<FlagModel>? ListToGuess { get; set; } = new List<FlagModel>();
        public List<FlagModel>? FlagsViewed { get; set; } = new List<FlagModel>();
        [NotNull]

        public FlagModel CountryToGuess { get; set; } = new();
        public Random rnd { get; set; } = new Random();
        public IndividualLetterComboInput input { get; set; } = new();
        public Dictionary<string, string> countryDict = new();
        public string json = "";
        public int Points { get; set; } = 0;
        #endregion
        #region Methods
        protected override async Task OnInitializedAsync()
        {

            string path = configuration.GetValue<string>("countryCode") ?? throw new ArgumentNullException(nameof(path));

            json =await _httpClient.GetStringAsync($"{path}");


            await base.OnInitializedAsync();
        }

        protected override void OnParametersSet()
        {
            countryDict = JsonSerializer.Deserialize<Dictionary<string, string>>(json) ?? throw new ArgumentNullException("json null");
           
            foreach (var kvp in countryDict)
            {
                FlagModel fm = new FlagModel();
                fm.Region = kvp.Value;
                fm.Code = kvp.Key;
                fm.Official = new();
                fm.Official.Add($"https://flagcdn.com/192x144/{kvp.Key}.png"); 
                
                countryAndFlags.Add(fm);

            }

#if DEBUG
            foreach (var item in countryAndFlags)
            {
                Console.WriteLine($"{item.Code}");
            }
#endif
             base.OnParametersSet();
        }
        private async Task NewGame()
        {

     
            FlagsViewed = new();
            if (countryAndFlags != null)
            {
                ListToGuess = countryAndFlags.OrderBy(_ => Guid.NewGuid()).Take(10).ToList();
                if (ListToGuess.Count > 0)
                {
                    CountryToGuess = ListToGuess[0];
                }
            }
        }
        protected void Decrement()
        {

        }

        private void NextFlag(bool correctGuess)
        {
            if (correctGuess)
            {
                Points += 10;
                if (ListToGuess != null && ListToGuess.Count > 0)
                {
                    FlagsViewed?.Add(CountryToGuess);
                    ListToGuess.RemoveAt(0);
                    StateHasChanged();
                    if (ListToGuess.Count > 0)
                    {
                        CountryToGuess = ListToGuess[0];
                    }
                    else
                    {
                        CountryToGuess = new FlagModel(); // Or handle end of list case
                    }
                }
            }


            StateHasChanged();
        }
        #endregion
    }
}
