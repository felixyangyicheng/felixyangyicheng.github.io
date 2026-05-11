using System.Timers;

namespace Capybara.Pages.GuessFlags
{
    public partial class GuessFlag : IDisposable
    {
        [Inject, NotNull] IConfiguration? configuration { get; set; }

        [NotNull]
        public List<FlagModel>? regionAndFlags { get; set; } = new();

        [NotNull]
        public List<FlagModel> ListToGuess { get; set; } = new();

        public List<FlagResult> FlagsViewed { get; set; } = new();

        [NotNull]
        public FlagModel RegionToGuess { get; set; } = new();

        public int Points { get; set; }

        private readonly Random rnd = new();
        private System.Timers.Timer? roundTimer;
        private bool IsLoading { get; set; } = true;
        private bool IsGameStarted { get; set; }
        private bool IsGameFinished { get; set; }
        private bool HintUsed { get; set; }
        private int RoundCount { get; set; } = 10;
        private int SecondsPerRound { get; set; } = 30;
        private int SecondsLeft { get; set; }
        private int CurrentRound { get; set; }
        private int Lives { get; set; } = 3;
        private int CurrentStreak { get; set; }
        private int BestStreak { get; set; }
        private string CurrentFlagImage { get; set; } = "";
        private string HintText { get; set; } = "";
        private string LastFeedback { get; set; } = "";
        private Severity LastFeedbackSeverity { get; set; } = Severity.Info;
        private bool IsRoundResolving { get; set; }

        private bool CanStart => regionAndFlags?.Count > 0;
        private int CorrectCount => FlagsViewed.Count(x => x.Correct);
        private double TimeProgress => SecondsPerRound == 0 ? 0 : SecondsLeft * 100.0 / SecondsPerRound;
        private string TimeText => TimeSpan.FromSeconds(Math.Max(SecondsLeft, 0)).ToString(@"mm\:ss");
        private Color TimerColor => TimeProgress > 50 ? Color.Success : TimeProgress > 20 ? Color.Warning : Color.Error;

        protected override async Task OnInitializedAsync()
        {
#if DEBUG
            string rootPath = configuration.GetValue<string>("rootPath") ?? throw new ArgumentNullException(nameof(rootPath));
#else
            string rootPath = configuration.GetValue<string>("githubLink") ?? throw new ArgumentNullException(nameof(rootPath));
#endif
            regionAndFlags = await _httpClient.GetFromJsonAsync<List<FlagModel>>($"{rootPath}/place_flags.json") ?? new();
            IsLoading = false;
            await base.OnInitializedAsync();
        }

        private Task NewGame()
        {
            StopTimer();

            Points = 0;
            Lives = 3;
            CurrentRound = 0;
            CurrentStreak = 0;
            BestStreak = 0;
            HintText = "";
            LastFeedback = "";
            FlagsViewed = new();
            ListToGuess = (regionAndFlags ?? new())
                .OrderBy(_ => rnd.Next())
                .Take(RoundCount)
                .ToList();

            IsGameStarted = true;
            IsGameFinished = false;
            StartNextRound();
            return Task.CompletedTask;
        }

        private void StartNextRound()
        {
            if (Lives <= 0 || CurrentRound >= RoundCount || ListToGuess.Count == 0)
            {
                FinishGame();
                return;
            }

            RegionToGuess = ListToGuess[0];
            CurrentRound++;
            HintUsed = false;
            HintText = "";
            CurrentFlagImage = PickFlagImage(RegionToGuess);
            SecondsLeft = SecondsPerRound;
            IsRoundResolving = false;
            StartTimer();
        }

        private async Task NextFlag(bool correctGuess)
        {
            if (!correctGuess || IsGameFinished)
            {
                return;
            }

            var earned = 100 + SecondsLeft * 2 + CurrentStreak * 10;
            Points += earned;
            CurrentStreak++;
            BestStreak = Math.Max(BestStreak, CurrentStreak);
            LastFeedback = $"+{earned} points";
            LastFeedbackSeverity = Severity.Success;

            await CompleteCurrentRound(true);
        }

        private async Task SkipFlag()
        {
            CurrentStreak = 0;
            Lives--;
            LastFeedback = $"Passé: {RegionToGuess.Region}";
            LastFeedbackSeverity = Severity.Warning;
            await CompleteCurrentRound(false);
        }

        private Task UseHint()
        {
            if (HintUsed)
            {
                return Task.CompletedTask;
            }

            HintUsed = true;
            Points = Math.Max(0, Points - 25);
            HintText = BuildHint(RegionToGuess.Region);
            return Task.CompletedTask;
        }

        private async Task CompleteCurrentRound(bool correct)
        {
            if (IsRoundResolving)
            {
                return;
            }

            IsRoundResolving = true;
            StopTimer();

            FlagsViewed.Add(new FlagResult
            {
                Region = RegionToGuess.Region,
                Code = RegionToGuess.Code,
                Official = RegionToGuess.Official,
                Proposed = RegionToGuess.Proposed,
                Details = RegionToGuess.Details,
                Correct = correct,
                Order = CurrentRound
            });

            if (ListToGuess.Count > 0)
            {
                ListToGuess.RemoveAt(0);
            }

            await InvokeAsync(StateHasChanged);
            await Task.Delay(650);
            StartNextRound();
            await InvokeAsync(StateHasChanged);
        }

        private async void OnTimerElapsed(object? sender, ElapsedEventArgs e)
        {
            SecondsLeft--;

            if (SecondsLeft <= 0)
            {
                StopTimer();
                CurrentStreak = 0;
                Lives--;
                LastFeedback = $"Temps écoulé: {RegionToGuess.Region}";
                LastFeedbackSeverity = Severity.Error;
                await CompleteCurrentRound(false);
                return;
            }

            await InvokeAsync(StateHasChanged);
        }

        private void StartTimer()
        {
            StopTimer();
            roundTimer = new System.Timers.Timer(1000);
            roundTimer.Elapsed += OnTimerElapsed;
            roundTimer.AutoReset = true;
            roundTimer.Start();
        }

        private void StopTimer()
        {
            if (roundTimer is null)
            {
                return;
            }

            roundTimer.Stop();
            roundTimer.Elapsed -= OnTimerElapsed;
            roundTimer.Dispose();
            roundTimer = null;
        }

        private void FinishGame()
        {
            StopTimer();
            IsGameFinished = true;
            RegionToGuess = new FlagModel();
            CurrentFlagImage = "";
        }

        private string PickFlagImage(FlagModel flag)
        {
            var images = flag.Official.Concat(flag.Proposed).Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            return images.Count == 0 ? "" : images[rnd.Next(images.Count)];
        }

        private static string GetFlagImage(FlagModel flag)
        {
            return flag.Official.FirstOrDefault() ?? flag.Proposed.FirstOrDefault() ?? "";
        }

        private static string BuildHint(string answer)
        {
            var letters = answer.Where(char.IsLetterOrDigit).ToList();
            var first = letters.FirstOrDefault();
            var length = letters.Count;

            if (first == default)
            {
                return $"Réponse en {answer.Length} caractères.";
            }

            return $"Commence par '{char.ToUpper(first)}' et contient {length} lettres/chiffres.";
        }

        public void Dispose()
        {
            StopTimer();
        }
    }
}
