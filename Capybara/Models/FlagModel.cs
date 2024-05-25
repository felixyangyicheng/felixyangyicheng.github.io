namespace Capybara.Models
{
    public class FlagModel
    {
        public string Region { get; set; } = "";
        public List<string> Official { get; set; }= new List<string>();
        public List<string> Proposed { get; set; } = new List<string>();
        public List<string> Details { get; set; } = new List<string>();
    }
}
