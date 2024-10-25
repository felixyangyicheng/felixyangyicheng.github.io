using Heron.MudCalendar;

namespace Capybara.Models.Appointment
{

	public class Guest
	{
		public string Civility { get; set; } = "";
		public string FamilyName { get; set; } = "";
		public string GivenName { get; set; } = "";
		public string Email { get; set; } = "";
		public string Phone { get; set; } = "";
	}
	public class CustomCalendarItem : CalendarItem
	{
		public string Title { get; set; } = string.Empty;
		public string Location { get; set; } = string.Empty;
		public Color Color { get; set; } = Color.Primary;
		public Guest Guest { get; set; } = new();
	}
}
