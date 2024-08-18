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
            return true;
        }


    }
}
