using System.Threading.Tasks;

namespace Capybara.Components.Dominos
{
    public partial class PlayerHand
    {
        private List<Domino> dominoPieces = new List<Domino>();


        private void InitDominoPiece()
        {
            // pieceCount = dominoPieces.Count;
            //bool isVertical = pieceCount % 5 == 0 && pieceCount != 0;
            dominoPieces.Add(new Domino(4, 1));

            dominoPieces.Add(new Domino(3, 2));
            dominoPieces.Add(new Domino(6, 2));
            dominoPieces.Add( new Domino(2, 1));
            dominoPieces.Add(new Domino(1, 5));
            dominoPieces.Add(new Domino(3, 3));
            dominoPieces.Add( new Domino(5, 5));

        }
    }
}
