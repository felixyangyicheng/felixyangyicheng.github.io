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
        private string DominoImage(int number) => number switch
        {
            0 => "img/dominos/domino0.svg",
            1 => "img/dominos/domino1.svg",
            2 => "img/dominos/domino2.svg",
            3 => "img/dominos/domino3.svg",
            4 => "img/dominos/domino4.svg",
            5 => "img/dominos/domino5.svg",
            6 => "img/dominos/domino6.svg",
            7 => "img/dominos/domino7.svg",
            8 => "img/dominos/domino8.svg",
            9 => "img/dominos/domino9.svg",

            _ => throw new ArgumentOutOfRangeException(nameof(number), $"Not expected direction value: {number}"),
        };
    }
}
