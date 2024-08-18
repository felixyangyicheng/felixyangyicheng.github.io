using System.Collections.Generic;

namespace Capybara.Components.Dominos
{
    public partial class BoardView
    {
        private LinkedList<DominoPieceModel> dominoPieces = new LinkedList<DominoPieceModel>();
        public string BasePath { get; set; } = "";
        public int number = 0;

        public int? ValueFisrt = null;
        public int? ValueLast = null;

        protected override void OnInitialized()
        {
            BasePath = $"{Configuration["raw.githubusercontent"]}";
            // Initialiser les pièces de domino avec des données d'exemple

            // Continuez d'ajouter des pièces comme vous le souhaitez...
            InitDominoPiece();

        }

        private void InitDominoPiece()
        {
            // pieceCount = dominoPieces.Count;
            //bool isVertical = pieceCount % 5 == 0 && pieceCount != 0;
            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(4, 1),
                Number = 6
                //Class = isVertical ? "vertical" : ""
            });

            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(1, 2),
                Number = 2
                //Class = isVertical ? "vertical" : ""
            });
            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(2, 2),
                Number = 1


            });
            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(2, 6),
                Number = 0


            });
            dominoPieces.AddLast(new DominoPieceModel
            {

                Domino = new Domino(6, 5),
                Number = 3


            });
            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(5, 4),
                Number = 4


            });
            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(4, 4),
                Number = 5


            });
            ValueFisrt = dominoPieces.First.Value.Domino.Value1;
            ValueLast = dominoPieces.Last.Value.Domino.Value2;
        }

        private int? GetLinkListLastPlayableValue()
        {
            var firstDomino = dominoPieces.First?.Value.Domino;
            var nextDomino = dominoPieces.First?.Next?.Value.Domino;
            if (firstDomino?.Value1 == nextDomino?.Value1 || firstDomino?.Value1 == nextDomino?.Value2)
            {
                return firstDomino?.Value2;
            }
            if (firstDomino?.Value2 == nextDomino?.Value1 || firstDomino?.Value2 == nextDomino?.Value2)
            {
                return firstDomino?.Value1;
            }
            return null;
        }
        private int? GetLinkListFirstPlayableValue()
        {
            var firstDomino = dominoPieces.First?.Value.Domino;
            var nextDomino = dominoPieces.First?.Next?.Value.Domino;
            if (firstDomino?.Value1 == nextDomino?.Value1 || firstDomino?.Value1 == nextDomino?.Value2)
            {
                return firstDomino?.Value2;
            }
            if (firstDomino?.Value2 == nextDomino?.Value1 || firstDomino?.Value2 == nextDomino?.Value2)
            {
                return firstDomino?.Value1;
            }
            return null;
        }
        private void AddDomino(Domino domino)
        {
            number = dominoPieces.Count;

            if (domino.CanBePlacedNextTo(dominoPieces.First.Value.Domino))
            {
                dominoPieces.AddFirst(new DominoPieceModel
                {
                    Domino = domino,
                    Number = number
                });
            }
            else if (domino.CanBePlacedNextTo(dominoPieces.Last.Value.Domino))
            {

                dominoPieces.AddLast(new DominoPieceModel
                {
                    Domino = domino,
                    Number = number
                });
            }
            ValueFisrt = dominoPieces.First.Value.Domino.Value1;
            ValueLast = dominoPieces.Last.Value.Domino.Value2;
            StateHasChanged();
        }

        private class DominoPieceModel
        {
            public Domino Domino { get; set; }
            public int Number { get; set; }
            public string Width { get; set; } = "120px";
            public string Height { get; set; } = "60px";
            public string Class { get; set; } = "";
        }
    }
}
