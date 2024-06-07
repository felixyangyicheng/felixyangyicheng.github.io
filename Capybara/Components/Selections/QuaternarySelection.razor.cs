using MudBlazor.Charts;
using System;

namespace Capybara.Components.Selections
{
    public partial class QuaternarySelection
    {
        [Parameter, NotNull]
        public DogBreedQuaternary Quaternary { get; set; }=new DogBreedQuaternary();
        [Parameter, NotNull]
        public EventCallback<bool> OnBreedSelected { get; set; }

        public string ButtonHeightWidth { get; set; } = "height: 12vh;";
        public Color Color { get; set; } = Color.Info;

        protected override async Task OnParametersSetAsync()
        {
            Random rnd = new Random();
            Color = (Color)rnd.Next(0, 8);
            Quaternary.DogBreedProposes= Quaternary.DogBreedProposes.OrderBy(_ => Guid.NewGuid()).ToList();
            await base.OnParametersSetAsync();
        }


    }
}
