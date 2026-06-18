using Capybara.Components.Charts;
using static System.Net.WebRequestMethods;

namespace Capybara.Pages.GuessFlags
{
    public partial class Countries
    {
        #region DI
        [Inject, NotNull] IDialogService? DialogService { get; set; }

        [Inject, NotNull] IConfiguration? configuration { get; set; }

        #endregion
        #region Properties
        [NotNull]
        public List<FlagModel>? countryAndFlags { get; set; } = new List<FlagModel>();
        [NotNull]
        public List<FlagModel>? ListToGuess { get; set; } = new List<FlagModel>();
        public List<FlagResult>? FlagsViewed { get; set; } = new();
        [NotNull]

        public FlagModel CountryToGuess { get; set; } = new();
        public Random rnd { get; set; } = Random.Shared;
        public IndividualLetterComboInput input { get; set; } = new();
        public SimpleStatisticComponent chart { get; set; } = new();
        public Dictionary<string, string> countryDict = new();
        private List<StatisticModel> GuessResult { get; set; } = new();


        protected CountDownBar timer = new CountDownBar();
        public string json = "";
        public int Points { get; set; } = 0;
        #endregion
        #region Methods
        #region On Initialized Async

        protected override async Task OnInitializedAsync()
        {
            string path = configuration.GetValue<string>("countryCode") ?? throw new ArgumentNullException(nameof(path));
            json = await _httpClient.GetStringAsync($"{path}");
            // 国家列表只需要在 JSON 加载后初始化一次，避免每次参数刷新都重建列表并影响输入框焦点。
            InitializeCountries();
            await base.OnInitializedAsync();
        }
        #endregion
        #region On AfterRender Async
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            await base.OnAfterRenderAsync(firstRender);
        }
        #endregion
        #region On AfterRender Async

        private void InitializeCountries()
        {
            countryDict = JsonSerializer.Deserialize<Dictionary<string, string>>(json) ?? throw new ArgumentNullException("json null");
            // 清空后再填充，防止重新初始化时出现重复国家。
            countryAndFlags.Clear();

            foreach (var kvp in countryDict)
            {
                if (!kvp.Key.Contains("-"))
                {

                    FlagModel fm = new FlagModel();
                    fm.Region = kvp.Value;
                    fm.Code = kvp.Key;
                    fm.Official = new();
                    fm.Official.Add($"https://flagcdn.com/192x144/{kvp.Key}.png");

                    countryAndFlags.Add(fm);
                }

            }
        }
        #endregion
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
        protected void Decrement(int hint)
        {

        }
        private async Task TimerOutCallback()
        {
            await NextFlag(false);
        }
        private async Task NextFlag(bool correctGuess)
        {


            if (ListToGuess != null && ListToGuess.Count > 0)
            {
                FlagResult result = new();
                result.Region = CountryToGuess.Region;
                result.Code = CountryToGuess.Code;
                result.Correct = correctGuess;
                result.Order = ListToGuess.Count;
                DialogOptions options = new DialogOptions() { MaxWidth = MaxWidth.Medium, FullWidth = true, Position = DialogPosition.TopCenter };
                var parameters = new DialogParameters<FlagResultDialog>();
                parameters.Add(x => x.Result, result);
                var dialog = await DialogService.ShowAsync<FlagResultDialog>("Result", parameters, options);
                var r = await dialog.Result;

                FlagsViewed?.Add(result);
                FlagsViewed = FlagsViewed?.OrderBy(x => x.Order).ToList();

                StatisticModel stat = new StatisticModel { Title = CountryToGuess.Region };

                stat.Ok = FlagsViewed?.Count(x => x.Correct == true);
                stat.Ko = FlagsViewed?.Count(x => x.Correct == false);
                GuessResult.Clear();
                GuessResult.Add(stat);

                ListToGuess.RemoveAt(0);
                await InvokeAsync(StateHasChanged);

                if (ListToGuess.Count > 0)
                {
                    CountryToGuess = ListToGuess[0];
                }
                else
                {
                    DialogOptions o = new DialogOptions() { MaxWidth = MaxWidth.Medium, FullWidth = true, Position = DialogPosition.TopCenter };
                    var p = new DialogParameters<ResultChartDialog>();
                    p.Add(x => x.GuessResult, GuessResult);
                    var d = await DialogService.ShowAsync<ResultChartDialog>("Result", p, o);

                    CountryToGuess = new FlagModel(); // Or handle end of list case
                }
            }



            await InvokeAsync(StateHasChanged);
        }
        #endregion
    }
}
