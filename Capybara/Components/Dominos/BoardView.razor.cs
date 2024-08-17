using System.Collections.Generic;

namespace Capybara.Components.Dominos
{
    public partial class BoardView
    {
        private LinkedList<DominoPieceModel> dominoPieces = new LinkedList<DominoPieceModel>();
        public string BasePath { get; set; } = "";

        protected override void OnInitialized()
        {
            BasePath = $"{Configuration["raw.githubusercontent"]}";
            // Initialiser les pièces de domino avec des données d'exemple

            // Continuez d'ajouter des pièces comme vous le souhaitez...
            AddDominoPiece(6);
        }

        private void AddDominoPiece(int pieceCount)
        {
            // pieceCount = dominoPieces.Count;
            bool isVertical = pieceCount % 5 == 0 && pieceCount != 0;


            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(1, 2),
                Class = isVertical ? "vertical" : ""
            });
            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(2, 2),
                Class = isVertical ? "vertical" : ""
            });
            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(2, 6),
                Class = isVertical ? "vertical" : ""
            });
            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(6, 5),
                Class = isVertical ? "vertical" : ""
            });
            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(5, 4),
                Class = isVertical ? "vertical" : ""
            });
            dominoPieces.AddLast(new DominoPieceModel
            {
                Domino = new Domino(4, 4),
                Class = isVertical ? "vertical" : ""
            });
        }

        private class DominoPieceModel
        {
            public Domino Domino { get; set; }
            public string Width { get; set; } = "120px";
            public string Height { get; set; } = "60px";
            public string Class { get; set; } = "";
        }
    }
}
