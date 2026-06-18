namespace Capybara.Models
{
    public class Game
    {
        public int HostId { get; set; }
        public int NumberOfPlayers { get; set; }
        public int MaxPip { get; set; } = 9;
        public int TotalDominoes { get; set; }
        public int DominosPerPlayer { get; set; }
        public int BoneyardCount { get; set; }
        public List<Player> Players { get; set; } = new List<Player>();
        public List<Domino> Board { get; set; } = new List<Domino>();
        public int CurrentPlayerIndex { get; set; }
        public string Status { get; set; } = "Waiting";
        public int? ValueFirst { get; set; }
        public int? ValueLast { get; set; }
        public string? WinnerConnectionId { get; set; }
        public string? WinnerName { get; set; }
        public string? EndReason { get; set; }
        public List<PlayerStatistic> Statistics { get; set; } = new List<PlayerStatistic>();

        public bool IsFull => Players.Count == NumberOfPlayers;
    }

    public class PlayerStatistic
    {
        public string PlayerName { get; set; } = "";
        public int Score { get; set; }
        public int RemainingDominoes { get; set; }
        public int RemainingPips { get; set; }
        public int PlayedCount { get; set; }
        public int PassedCount { get; set; }
        public bool IsWinner { get; set; }
    }
}
