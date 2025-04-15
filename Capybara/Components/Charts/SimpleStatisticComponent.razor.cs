using Microsoft.Extensions.Options;

namespace Capybara.Components.Charts
{
    public partial class SimpleStatisticComponent
    {
        [Parameter, NotNull] public List<StatisticModel> GuessResult { get; set; } = default!;
        [Inject] public IApexChartService ApexChartService { get; set; } = default!;
        private ApexChart<StatisticModel> _barChart { get; set; } = new();

        private ApexChartOptions<StatisticModel> _barCharOptions { get; set; } = new ApexChartOptions<StatisticModel>
        {
            PlotOptions = new PlotOptions
            {
                Bar = new PlotOptionsBar
                {
                    Horizontal = true
                }
            }
        };


        protected override void OnInitialized()
        {

            _barCharOptions.Blazor = new ApexChartsBlazorOptions { JavascriptPath = "https://apexcharts.github.io/Blazor-ApexCharts/_content/Blazor-ApexCharts/js/blazor-apexcharts.js" };
            //_barCharOptions = new ApexChartOptions<StatisticModel>
            //{
            //    Theme = new Theme
            //    {
            //        Mode = Mode.Light,
            //        Palette = PaletteType.Palette1
            //    }
            //};

        }
        protected override async Task OnParametersSetAsync()
        {

            await _barChart.RenderAsync();
            await base.OnParametersSetAsync();
        }


    }
}
