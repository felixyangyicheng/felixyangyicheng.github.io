using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.JSInterop;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace Capybara.Components.ComboInput
{
    public partial class IndividualLetterComboInput : IDisposable
    {
        [Inject] private IJSRuntime JSRuntime { get; set; } = default!;

        [Parameter, NotNull]
        public string StringInit { get; set; } = "";

        [Parameter]
        public EventCallback<bool> OnWordOk { get; set; }

        [Parameter]
        public EventCallback<int> OnHintAsked { get; set; }

        [Parameter]
        public bool HintAvaiable { get; set; }

        private string[] InputValues { get; set; } = Array.Empty<string>();
        private string[] InputClasses { get; set; } = Array.Empty<string>();
        private bool[] InputDisabled { get; set; } = Array.Empty<bool>();
        private int? _pendingFocusIndex = null;
        private bool _shouldFocusAfterRender = false;
        private CancellationTokenSource[] _errorTimers = Array.Empty<CancellationTokenSource>();

        protected override void OnParametersSet()
        {
            CancelAllErrorTimers();
            _shouldFocusAfterRender = true;   // 新词加载必须聚焦
            InitializeArrays();
        }

        private void InitializeArrays()
        {
            InputValues = new string[StringInit.Length];
            InputClasses = new string[StringInit.Length];
            InputDisabled = new bool[StringInit.Length];
            _errorTimers = new CancellationTokenSource[StringInit.Length];

            for (int i = 0; i < StringInit.Length; i++)
            {
                char c = StringInit[i];
                bool isSpecial = c == '-' || char.IsWhiteSpace(c);
                InputValues[i] = isSpecial ? c.ToString() : "";
                InputClasses[i] = "default";
                InputDisabled[i] = isSpecial;
                _errorTimers[i] = new CancellationTokenSource();
            }
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender || _shouldFocusAfterRender)
            {
                _shouldFocusAfterRender = false;
                var idx = FindFirstEmptyIndex();
                if (idx.HasValue)
                    await FocusIndexAsync(idx.Value);
                return;
            }

            if (_pendingFocusIndex.HasValue)
            {
                await FocusIndexAsync(_pendingFocusIndex.Value);
                _pendingFocusIndex = null;
            }
        }

        private int? FindFirstEmptyIndex()
        {
            for (int i = 0; i < InputValues.Length; i++)
                if (!InputDisabled[i] && string.IsNullOrEmpty(InputValues[i]))
                    return i;
            return null;
        }

        private int? FindNextEmptyIndex(int currentIndex)
        {
            for (int i = currentIndex + 1; i < InputValues.Length; i++)
                if (!InputDisabled[i] && string.IsNullOrEmpty(InputValues[i])) return i;

            for (int i = 0; i < currentIndex; i++)
                if (!InputDisabled[i] && string.IsNullOrEmpty(InputValues[i])) return i;

            return null;
        }

        private async Task FocusIndexAsync(int index)
        {
            if (index < 0 || index >= InputValues.Length) return;

            string id = $"letter-{index}";

            for (int attempt = 0; attempt < 8; attempt++)   // 最多等 ~200ms
            {
                try
                {
                    await JSRuntime.InvokeVoidAsync("capybaraFocus", id);
                    return;
                }
                catch
                {
                    await Task.Delay(25);
                }
            }
            Console.WriteLine($"[Focus] 无法聚焦 letter-{index}（已重试）");
        }

        private async Task HandleInput(ChangeEventArgs e, int index)
        {
            var input = e.Value?.ToString()?.Trim();
            if (string.IsNullOrEmpty(input)) return;

            _errorTimers[index]?.Cancel();
            _errorTimers[index] = new CancellationTokenSource();
            var token = _errorTimers[index].Token;

            if (input.Length == 1 && IsCorrectChar(input[0], StringInit[index]))
            {
                InputValues[index] = input;
                InputClasses[index] = "correct";
                InputDisabled[index] = true;

                if (CheckAllCorrect())
                {
                    await OnWordOk.InvokeAsync(true);
                }
                else
                {
                    var nextIdx = FindNextEmptyIndex(index);
                    if (nextIdx.HasValue)
                    {
                        _pendingFocusIndex = nextIdx.Value;
                        StateHasChanged();
                    }
                }
            }
            else
            {
                InputClasses[index] = "error";
                InputValues[index] = input;
                StateHasChanged();

                try
                {
                    await Task.Delay(1000, token);
                    if (!token.IsCancellationRequested)
                    {
                        InputValues[index] = string.Empty;
                        InputClasses[index] = "incorrect";
                        InputDisabled[index] = false;

                        _pendingFocusIndex = index;
                        StateHasChanged();
                    }
                }
                catch (TaskCanceledException) { }
            }
        }

        private void CancelAllErrorTimers()
        {
            foreach (var timer in _errorTimers)
            {
                timer?.Cancel();
                timer?.Dispose();
            }
        }

        private bool IsCorrectChar(char input, char target) => char.ToLower(input) == char.ToLower(target);

        private bool CheckAllCorrect()
        {
            for (int i = 0; i < InputValues.Length; i++)
                if (!InputDisabled[i] && string.IsNullOrEmpty(InputValues[i]))
                    return false;
            return true;
        }

        public void Dispose() => CancelAllErrorTimers();
    }
}