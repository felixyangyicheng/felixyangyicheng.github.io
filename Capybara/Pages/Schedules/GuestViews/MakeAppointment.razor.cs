


namespace Capybara.Pages.Schedules.GuestViews
{
	public partial class MakeAppointment
	{

		[Inject]
		private IDialogService DialogService { get; set; } = default!;
		private CustomCalendarItem SubmitModel { get; set; } = new();
		private string GetColor(Color color) => $"var(--mud-palette-{color.ToDescriptionString()})";

		private List<CustomCalendarItem> events = new()
	{
		new CustomCalendarItem
		{
			Start = DateTime.Today.AddHours(10),
			End = DateTime.Today.AddHours(11),
			Title = "Event today",
			Location = "Over here",
			Text = "This is an event today",
			Color = Color.Secondary,
			 Guest = new Guest
			{
				Civility="M.",
				FamilyName="Menvu",
				GivenName="Gérard"
			}
		},
		new CustomCalendarItem
		{
			Start = DateTime.Today.AddDays(1).AddHours(11),
			End = DateTime.Today.AddDays(1).AddHours(12.5),
			Title = "Event tomorrow",
			Location = "Over there",

			Text = "This is an event tomorrow",
			Color = Color.Tertiary,
			Guest = new Guest
			{
				Civility="Mme.",
				FamilyName="Fatoun",
				GivenName="Kimberley"
			}
		}
	};


		protected async Task CellClicked(DateTime dateTime)
		{
			DialogOptions o = new DialogOptions() { MaxWidth = MaxWidth.Medium, FullWidth = true, Position = DialogPosition.TopCenter };
			var p = new DialogParameters<MakeAppointmentDialog>();
			p.Add(x => x.SubmitModel, dateTime);
			var d = await DialogService.ShowAsync<MakeAppointmentDialog>("Rendez-vous", p, o);

		}

	}
}
