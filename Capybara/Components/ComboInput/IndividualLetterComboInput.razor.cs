using Microsoft.AspNetCore.Components.Forms;
using Microsoft.JSInterop;
using static MudBlazor.CategoryTypes;

namespace Capybara.Components.ComboInput
{
    public partial class IndividualLetterComboInput
    {
        [Parameter, NotNull]
        public string StringInit { get; set; } = "";
        [Parameter]
        public EventCallback<bool> OnWordOk { get; set; }
        [Parameter]

        public EventCallback<int> OnHintAsked { get; set; }
        [Parameter]
        public bool HintAvaiable { get; set; }


        private string[] InputValues { get; set; } = new string[0];
        [NotNull]
        private ElementReference[]? InputRefs { get; set; } = default!;
        private string[] InputClasses { get; set; } = new string[0];
        private bool[] InputDisabled { get; set; } = new bool[0];
        private bool AllInputsCorrect { get; set; }
        // private bool FirstRender { get; set; } = true;
        private bool ElementsRendered { get; set; } = false;
        protected override async Task OnParametersSetAsync()
        {

            InputValues = new string[StringInit.Length];
            foreach (var item in StringInit.Select((value, i) => (value, i)))
            {
                if (char.ToString(item.value).Equals("-") || char.IsWhiteSpace(item.value))
                {
                    InputValues[item.i] = item.value.ToString();
                }
            }
            InputRefs = new ElementReference[StringInit.Length];

            InputDisabled = Enumerable.Repeat(false, StringInit.Length).ToArray();
            foreach (var item in StringInit.Select((value, i) => (value, i)))
            {
                if (char.ToString(item.value).Equals("-") || char.IsWhiteSpace(item.value))
                {
                    InputDisabled[item.i] = true;
                }
            }
            InputClasses = Enumerable.Repeat("default", StringInit.Length).ToArray();
            AllInputsCorrect = false;

            ElementsRendered = false;

            await base.OnParametersSetAsync();
        }



        protected override async Task OnAfterRenderAsync(bool firstRender)
        {

            ElementsRendered = true;
            //Console.WriteLine(ElementsRendered);

            await Task.WhenAny(FocusFirstEmptyInput());

            await FocusFirstEmptyInput();
            //await base.OnAfterRenderAsync(firstRender);

        }



        private async Task HandleInput(ChangeEventArgs e, int index)
        {
            var input = e.Value?.ToString();
            if (input?.Length == 1 && (input[0] == StringInit[index] || char.ToLower(input[0]) == char.ToLower(StringInit[index])))
            {
                InputValues[index] = input;
                InputClasses[index] = "correct";
                InputDisabled[index] = true;

                if (index == StringInit.Length - 1)
                {
                    AllInputsCorrect = true;
                    foreach (var val in InputValues)
                    {
                        if (string.IsNullOrEmpty(val))
                        {
                            ElementsRendered = false;
                            AllInputsCorrect = false;
                            break;
                        }
                    }

                    if (AllInputsCorrect)
                    {
                        await OnWordOk.InvokeAsync(AllInputsCorrect);
                        ElementsRendered = false;
                        StateHasChanged();
                        return;
                    }
                    else
                    {
                        ElementsRendered = false;
                        await FocusFirstEmptyInput();
                        return;
                    }
                }

                if (index < StringInit.Length - 1)
                {
                    ElementsRendered = false;
                    await FocusFirstEmptyInput();
                }
            }
            else
            {
                ElementsRendered = false;

                InputValues[index] = string.Empty;
                InputClasses[index] = "incorrect";
            }
            ElementsRendered = false;
            StateHasChanged();
        }

        private async Task FocusFirstEmptyInput()
        {
            if (!ElementsRendered)
            {
                return;
            }
            try
            {
                if (InputRefs?.Length <= 0)
                {


                }
                else
                {
                    for (int i = 0; i < InputValues.Length; i++)
                    {
                        if (string.IsNullOrEmpty(InputValues[i]) && !InputDisabled[i])
                        {
                            await InputRefs[i].MudFocusFirstAsync();
                            break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message.ToString());
                throw ex;
            }

        }
        private string GetInputClass(int index)
        {
            if (AllInputsCorrect)
            {
                return "all-correct";
            }
            return InputClasses[index];
        }
        private async Task ProvideHint()
        {
            // Get indices of inputs that are not yet correct and not disabled
            var availableIndices = Enumerable.Range(0, StringInit.Length)
                                             .Where(i => InputValues[i] == null || InputValues[i] == string.Empty)
                                             .Where(i => !InputDisabled[i])
                                             .ToList();

            if (availableIndices.Count > 0)
            {
                Random rnd = new Random();
                var randomIndex = availableIndices[rnd.Next(availableIndices.Count)];

                // Set the correct letter at this index
                InputValues[randomIndex] = StringInit[randomIndex].ToString();
                InputClasses[randomIndex] = "correct";
                InputDisabled[randomIndex] = true;
                // Disable the input

                await InvokeAsync(StateHasChanged);
            }
            await OnHintAsked.InvokeAsync(10);

        }
        void ValidationStateChanged(object sender, ValidationStateChangedEventArgs e)
        {
            StateHasChanged();
        }
        public void Dispose()
        {
            //ValidationStateChanged;
        }
    }

}
