namespace Capybara.Components.Selections
{
    public partial class QuaternarySelection
    {
        [Parameter, NotNull]
        public DogBreedQuaternary Quaternary { get; set; }=new DogBreedQuaternary();
        [Parameter, NotNull]
        public EventCallback<bool> OnBreedSelected { get; set; }

        public string ButtonHeightWidth { get; set; } = "height: 12vh;";

    }
}
