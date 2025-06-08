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

        private string[] InputValues { get; set; } = new string[0];
        private ElementReference[] InputRefs { get; set; } = default!;
        private string[] InputClasses { get; set; } = new string[0];
        private bool[] InputDisabled { get; set; } = new bool[0];
        private bool AllInputsCorrect { get; set; }
        private bool _isFocused = false;
        private bool _shouldFocusAfterRender = false; // 新增标志
        private CancellationTokenSource[] _errorTimers = Array.Empty<CancellationTokenSource>();

        protected override void OnParametersSet()
        {
            // 取消所有之前的错误计时器
            CancelAllErrorTimers();
            // 当StringInit变化时（新词组加载）设置焦点标志
            _shouldFocusAfterRender = true;
            InitializeArrays();
        }

        private void InitializeArrays()
        {
            InputValues = new string[StringInit.Length];
            InputRefs = new ElementReference[StringInit.Length];
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
                await Task.Delay(50); // 确保DOM更新完成
                await FocusFirstEmptyInput();
            }
        }

        private async void HandleInput(ChangeEventArgs e, int index)
        {
            if (_isFocused) return;
            _isFocused = true;

            var input = e.Value?.ToString()?.Trim();
            if (string.IsNullOrEmpty(input))
            {
                _isFocused = false;
                return;
            }
            // 取消该输入框之前的错误计时器（如果有）
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
                    await FocusNextEmptyInput(index);
                }
            }
            else
            {
                // 设置错误状态（摇晃+红色）
                InputClasses[index] = "error";
                InputValues[index] = input; // 临时显示错误输入

                // 触发状态更新以应用错误样式
                StateHasChanged();

                try
                {
                    // 1秒后清除错误输入
                    await Task.Delay(1000, token);

                    if (!token.IsCancellationRequested)
                    {
                        InputValues[index] = string.Empty;
                        InputClasses[index] = "incorrect";
                        StateHasChanged();

                        // 重新聚焦到当前输入框
                        await InputRefs[index].FocusAsync();
                    }
                }
                catch (TaskCanceledException)
                {
                    // 计时器被取消是正常情况
                }
            }

            _isFocused = false;
        }
        private void CancelAllErrorTimers()
        {
            foreach (var timer in _errorTimers)
            {
                timer?.Cancel();
                timer?.Dispose();
            }
        }

        private bool IsCorrectChar(char input, char target)
        {
            return char.ToLower(input) == char.ToLower(target);
        }

        private bool CheckAllCorrect()
        {
            for (int i = 0; i < InputValues.Length; i++)
            {
                if (!InputDisabled[i] && string.IsNullOrEmpty(InputValues[i]))
                    return false;
            }
            return true;
        }


        private async Task FocusNextEmptyInput(int currentIndex)
        {
            try
            {
                int nextIndex = currentIndex + 1;
                while (nextIndex < InputValues.Length)
                {
                    if (!InputDisabled[nextIndex] && string.IsNullOrEmpty(InputValues[nextIndex]))
                    {
                        await InputRefs[nextIndex].FocusAsync();
                        return;
                    }
                    nextIndex++;
                }

                // 如果后面没有空项，向前找
                for (int i = 0; i < currentIndex; i++)
                {
                    if (!InputDisabled[i] && string.IsNullOrEmpty(InputValues[i]))
                    {
                        await InputRefs[i].FocusAsync();
                        return;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Focus error: {ex.Message}");
            }
        }


        private async Task FocusFirstEmptyInput()
        {
            try
            {
                for (int i = 0; i < InputValues.Length; i++)
                {
                    if (!InputDisabled[i] && string.IsNullOrEmpty(InputValues[i]))
                    {
                        await InputRefs[i].FocusAsync();
                        return;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Initial focus error: {ex.Message}");
            }
        }

        public void Dispose()
        {
            CancelAllErrorTimers();
        }

    }
}


