using System.Collections.Generic;

namespace Capybara.Components.Dominos
{
    public partial class BoardView
    {
        private LinkedList<DominoPieceModel> dominoPieces = new LinkedList<DominoPieceModel>();
        public string BasePath { get; set; } = "";
        public int placedOrder = 0;
        public string NoPlaybaleText="";
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
            ValueFisrt = GetLinkListLastPlayableValue();
            ValueLast = GetLinkListLastPlayableValue();
        }
        /// <summary>
        /// Function to get playable value from the tail
        /// </summary>
        /// <param name="domino"></param>
        private int? GetLinkListLastPlayableValue()
        {
            var firstDomino = dominoPieces.Last?.Value.Domino;
            var nextDomino = dominoPieces.Last?.Previous?.Value.Domino;
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
        /// <summary>
        /// Function to get playable value from the head
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// Place a domino piece into board
        /// </summary>
        /// <param name="domino"></param>
        private void AddDomino(Domino domino)
        {
            placedOrder = dominoPieces.Count;

            if (domino.Value1== GetLinkListFirstPlayableValue()||domino.Value2==GetLinkListFirstPlayableValue())
            {
                dominoPieces.AddFirst(new DominoPieceModel
                {
                    Domino = domino,
                    Number = placedOrder
                });
            }
            else if (domino.Value1 == GetLinkListLastPlayableValue() || domino.Value2 == GetLinkListLastPlayableValue())
            {

                dominoPieces.AddLast(new DominoPieceModel
                {
                    Domino = domino,
                    Number = placedOrder
                });
            }
            else
            {
                NoPlaybaleText = "You must skip your turn";
            }
            ValueFisrt = GetLinkListFirstPlayableValue();
            ValueLast = GetLinkListLastPlayableValue();
            StateHasChanged();
        }


        private class DominoPieceModel
        {
            public Domino Domino { get; set; } = default!;
            public int Number { get; set; }
            public string Width { get; set; } = "120px";
            public string Height { get; set; } = "60px";
            public string Class { get; set; } = "";
        }
    }
}
