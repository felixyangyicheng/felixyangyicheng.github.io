namespace Capybara.Models
{
    public class Player
    {
        public string ConnectionId { get; set; }
        public string Name { get; set; }
        public List<Domino> Hand { get; set; } = new List<Domino>();
        public int Score { get; set; } = 0;
    }
}
