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

        protected override void OnInitialized()
        {

        }
    }
}
