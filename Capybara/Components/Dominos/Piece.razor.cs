namespace Capybara.Components.Dominos
{
    public partial class Piece
    {
        /// <summary>
        /// Domino value to dispatch
        /// </summary>
        [Parameter]
        public Domino Domino { get; set; } = default!;
        /// <summary>
        /// View need to be rotated ?
        /// </summary>
        [Parameter]
        public bool Rotate { get; set; }

        /// <summary>
        /// Complementary css class name
        /// </summary>
        [Parameter] 
        public string Class { get; set; } = "";
        /// <summary>
        /// BasePath to get raw content
        /// </summary>
        public string BasePath { get; set; } = "";
        protected override void OnInitialized()
        {
            BasePath= $"{Configuration["raw.githubusercontent"]}";
        }

        private string DominoImage(int number) => number switch
        {
            0  => $"{BasePath}/img/dominos/domino0.svg",
            1 => $"{BasePath}/img/dominos/domino1.svg",
            2 => $"{BasePath}/img/dominos/domino2.svg",
            3 => $"{BasePath}/img/dominos/domino3.svg",
            4 => $"{BasePath}/img/dominos/domino4.svg",
            5 => $"{BasePath}/img/dominos/domino5.svg",
            6 => $"{BasePath}/img/dominos/domino6.svg",
            7 => $"{BasePath}/img/dominos/domino7.svg",
            8 => $"{BasePath}/img/dominos/domino8.svg",
            9 => $"{BasePath}/img/dominos/domino9.svg",

            _ => throw new ArgumentOutOfRangeException(nameof(number), $"Not expected direction value: {number}"),
        };
    }
}
