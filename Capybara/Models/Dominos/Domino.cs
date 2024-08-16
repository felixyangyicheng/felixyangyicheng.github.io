namespace Capybara.Models
{
    public class Domino 
    {
        public int Value1 { get; set; }
        public int Value2 { get; set; }

        public Domino(int value1, int value2)
        {
            Value1 = value1;
            Value2 = value2;
        }

        public int TotalValue => Value1 + Value2;

        public bool CanBePlacedNextTo(Domino other)
        {
            return Value1 == other.Value1 || Value1 == other.Value2 || Value2 == other.Value1 || Value2 == other.Value2;
        }

        public bool CanBePlacedNextTo(int value)
        {
            return Value1 == value || Value2 == value;
        }
    }
}
