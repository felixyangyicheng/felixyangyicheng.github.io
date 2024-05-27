using Microsoft.JSInterop;

namespace Capybara.Components.ComboInput
{
    public partial class IndividualLetterComboInput
    {
        [Parameter]
        public string StringInit { get; set; }
        public string StringToCheck { get; set; } = "";
  
        private ElementReference[] inputRefs;

        protected override void OnInitialized()
        {
            if (StringInit != null)
            {
                inputRefs = new ElementReference[StringInit.Length+1];
            }
      
        }
        public bool? InputCorrect{get;set;}
       private void VerifyChar() 
       {

       }

        private void OnInputChanged(ChangeEventArgs e, int index)
        {
            Console.WriteLine(StringInit);
            Console.WriteLine(index);
            Console.WriteLine(e.Value.ToString());
            Console.WriteLine(StringInit[index]);
            if (IsValidInput(e.Value.ToString(), index))
            {
                MoveFocusToNextInput(index);
            }
        }

        private bool IsValidInput(string input, int index )
        {
            // Implémentez votre logique de validation ici
           
            return !string.IsNullOrEmpty(input) && char.IsAsciiLetter(input[0]) && input[0] == StringInit[index-1];
        }

        private async void MoveFocusToNextInput(int index)
        {
            if (index < StringInit.Length - 1)
            {
                await JSRuntime.InvokeVoidAsync("moveFocusToInput", inputRefs[index + 1]);
            }
        }

    }

}
