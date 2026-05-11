using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace Capybara.Components.ComboInput
{
    public partial class IndividualLetterComboInput : IDisposable
    {
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
        private ElementReference[] InputRefs { get; set; } = Array.Empty<ElementReference>();
        private string? _initializedWord;

        protected override void OnParametersSet()
        {
            // 父组件重新渲染时不要重置输入框，否则用户快速输入时会丢失焦点和已输入内容。
            if (StringInit == _initializedWord)
            {
                return;
            }

            CancelAllErrorTimers();
            _shouldFocusAfterRender = true;   // 新词加载必须聚焦
            _initializedWord = StringInit;
            InitializeArrays();
        }

        private void InitializeArrays()
        {
            InputValues = new string[StringInit.Length];
            InputClasses = new string[StringInit.Length];
            InputDisabled = new bool[StringInit.Length];
            InputRefs = new ElementReference[StringInit.Length];
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

            // 使用 Blazor 的 ElementReference 聚焦，避免 eval 查找不存在的 id 导致焦点丢失。
            for (int attempt = 0; attempt < 6; attempt++)
            {
                try
                {
                    await InputRefs[index].FocusAsync();
                    return;
                }
                catch
                {
                    await Task.Delay(20);
                }
            }
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
                        // 立即尝试聚焦下一格；如果 DOM 还没更新，OnAfterRenderAsync 会再次补偿。
                        await FocusIndexAsync(nextIdx.Value);
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

        private async Task HandleKeyDown(KeyboardEventArgs e, int index)
        {
            // 快速输入时，浏览器可能还停留在刚被禁用的格子；这里把该按键转交给下一格。
            if (string.IsNullOrEmpty(e.Key) || e.Key.Length != 1 || !InputDisabled[index])
            {
                return;
            }

            var nextIdx = FindNextEmptyIndex(index);
            if (!nextIdx.HasValue)
            {
                return;
            }

            await HandleInput(new ChangeEventArgs { Value = e.Key }, nextIdx.Value);
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
