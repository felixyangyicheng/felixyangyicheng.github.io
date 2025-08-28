using Capybara.Services.VpicAPI;

namespace Capybara.Pages.MotocyclesPages;

public partial class MotoMakers
{
    #region Injection

    [Inject, NotNull]
    IMakerService makerService { get; set; } = default!;
    #endregion
    #region Parameters

    [Parameter, NotNull]
    public EventCallback<string> OnMakerNameClicked { get; set; }
    #endregion
    protected Response<List<Model>> ModelsResponse { get; set; } = new();
    protected Response<List<Maker>> MakersResponse { get; set; } = new();
    protected override async Task OnInitializedAsync()
    {
        MakersResponse = await makerService.GetMakersForVehicleTypeAsync();


        
        await base.OnInitializedAsync();
    }

    protected async Task FindModel(string name)
    {
        ModelsResponse = await makerService.GetModelsForMakersAsync(name);

        await InvokeAsync(StateHasChanged);
    }
}
