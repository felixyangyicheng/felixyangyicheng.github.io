using System;

namespace Capybara.Components.Selections
{
    public partial class QuaternarySelection
    {
        private static readonly Random _random = new();

        [Parameter, NotNull]
        public DogBreedQuaternary Quaternary { get; set; } = new DogBreedQuaternary();
        [Parameter, NotNull]
        public EventCallback<bool> OnBreedSelected { get; set; }

        public string ButtonHeightWidth { get; set; } = "height: 12vh;";
        public MudBlazor.Color Color { get; set; } = MudBlazor.Color.Info;

        protected override async Task OnParametersSetAsync()
        {
            var colors = (MudBlazor.Color[])Enum.GetValues(typeof(MudBlazor.Color));
            Color = colors[_random.Next(0, colors.Length)];
            Quaternary.DogBreedProposes = Quaternary.DogBreedProposes.OrderBy(_ => Guid.NewGuid()).ToList();
            await base.OnParametersSetAsync();
        }
    }
}
