using System.Buffers.Text;

namespace Capybara.Models.RoadSecurityTheory
{
    public class RoadSecurityTheoryQuestion
    {
        public Guid id { get; set; }
        public int number { get; set; }
        public string Question { get; set; } = "";
        public string MediaUrl { get; set; } = "";
        public string MediaContent { get; set; } = "";
        public List<RoadSecurityTheoryChoice> Answers { get; set; } = new List<RoadSecurityTheoryChoice>();
    }
}
