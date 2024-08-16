namespace Capybara.Models
{
    public class Game
    {
        public string HostId { get; set; } = default!;
        public int NumberOfPlayers { get; set; }
        public int NumberOfRounds { get; set; }
        public List<Player> Players { get; set; } = new List<Player>();
        public LinkedList<Domino> Board { get; set; } = new LinkedList<Domino>();
        public int CurrentRound { get; set; } = 0;

        public bool IsFull => Players.Count == NumberOfPlayers;
    }
}
