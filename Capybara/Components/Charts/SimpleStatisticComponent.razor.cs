namespace Capybara.Components.Charts
{
    public partial class SimpleStatisticComponent
    {
        [Parameter, NotNull] public List<StatisticModel> GuessResult { get; set; } = default!;
        private ApexChart<StatisticModel> _barChart { get; set; } = new();

        private ApexChartOptions<StatisticModel> _barCharOptions { get; set; } = new ApexChartOptions<StatisticModel>
        {
            Theme = new Theme
            {
                Mode = Mode.Light,
                Palette = PaletteType.Palette6
            }
        };

        protected override async Task OnParametersSetAsync()
        {
            await _barChart.RenderAsync();
            await base.OnParametersSetAsync();
        }


    }
}
