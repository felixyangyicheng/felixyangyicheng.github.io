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
                    Horizontal = false
                }
            }
        };


        protected override void OnInitialized()
        {

            _barCharOptions.Blazor = new ApexChartsBlazorOptions { JavascriptPath = "https://apexcharts.github.io/Blazor-ApexCharts/_content/Blazor-ApexCharts/js/blazor-apexcharts.js" };


        }
        protected override async Task OnParametersSetAsync()
        {

            await _barChart.RenderAsync();
            await base.OnParametersSetAsync();
        }


    }
}
