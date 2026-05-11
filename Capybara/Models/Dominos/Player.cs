namespace Capybara.Models
{
    public class Player
    {
        public string ConnectionId { get; set; } = default!;
        public string Name { get; set; } = default!;
        public List<Domino> Hand { get; set; } = new List<Domino>();
        public int Score { get; set; } = 0;
        public int PlayedCount { get; set; }
        public int PassedCount { get; set; }
        public bool IsConnected { get; set; } = true;
        public int RemainingPips => Hand.Sum(d => d.TotalValue);
    }
}
