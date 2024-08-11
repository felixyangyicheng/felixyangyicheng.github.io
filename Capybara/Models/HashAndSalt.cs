namespace Capybara.Models
{
    public class HashAndSalt
    {
        public string HashedPassword { get; set; } = "";
        public string Salt { get; set; } = "";
    }
}
