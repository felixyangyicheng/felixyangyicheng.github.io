using Capybara.Services.VpicAPI;
using MudBlazor;
using static MudBlazor.CategoryTypes;

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

    #region properties
    /// <summary>
    /// Status de chargement
    /// </summary>
    private bool _processing = false;


    protected Response<List<Model>> ModelsResponse { get; set; } = new();
    protected Response<List<Maker>> MakersResponse { get; set; } = new();

    /// <summary>
    /// Local Makers list
    /// </summary>
    protected List<Maker> MakersView { get; set; } = new();
    /// <summary>
    /// Local models list by maker
    /// </summary>
    protected List<Model> ModelsView { get; set; } = new();

    private string MakerName = "";
    private string searchStringMakerName = "";
    private Maker SelectedMaker { get; set; } = new();
    private int selectedRowNumber = -1;
    private MudTable<Maker> makerTable = default!;
    private MudTable<Model> modelTable = default!;
    private List<string> clickedEvents = new();
    #endregion


    #region Methods
    /// <summary>
    /// Délégation
    /// </summary>
    /// <param name="mk"></param>
    /// <returns></returns>
    private bool FilterFuncMotoMaker(Maker mk) => FilterFunc(mk, searchStringMakerName);

    /// <summary>
    /// Fonction filtre nom de marque
    /// </summary>
    /// <param name="maker"></param>
    /// <param name="searchString"></param>
    /// <returns></returns>
    private bool FilterFunc(Maker maker, string searchString)
    {
        if (string.IsNullOrWhiteSpace(searchString))
            return true;
        if (maker.MakeName.Contains(searchString, StringComparison.OrdinalIgnoreCase))
            return true;

        return false;
    }
    /// <summary>
    /// OnInitializedAsync
    /// </summary>
    /// <returns></returns>
    /// 
    protected override async Task OnInitializedAsync()
    {
        MakersResponse = await makerService.GetMakersForVehicleTypeAsync();
        if (MakersResponse.Results!=null)
        {
            MakersView= MakersResponse.Results.ToList();
        }
        await InvokeAsync(StateHasChanged);

        await base.OnInitializedAsync();
    }
    /// <summary>
    /// Affect or re-affect SelectedMaker and MakerName states 
    /// </summary>
    /// <param name="tableRowClickEventArgs">click event</param>
    /// <returns></returns>
    /// <exception cref="NullReferenceException"></exception>
    private async Task RowClickEvent(TableRowClickEventArgs<Maker> tableRowClickEventArgs)
    {
        if (MakerName == tableRowClickEventArgs.Item?.MakeName)
        {
            SelectedMaker = new Maker();

            MakerName = string.Empty;

        }
        else
        {
            SelectedMaker = tableRowClickEventArgs.Item??throw new NullReferenceException($"{nameof(tableRowClickEventArgs.Item)} is null" );
            MakerName = tableRowClickEventArgs.Item?.MakeName ?? throw new NullReferenceException($"{nameof(tableRowClickEventArgs.Item.MakeName)} is null");
            int makerId= tableRowClickEventArgs.Item?.MakeID ?? throw new NullReferenceException($"{nameof(tableRowClickEventArgs.Item.MakeName)} is null");
            await FindModel(makerId);
        }
        await InvokeAsync(StateHasChanged);

    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="maker"></param>
    /// <param name="rowNumber"></param>
    /// <returns></returns>
    private string SelectedRowClassFunc(Maker maker, int rowNumber)
    {
        if (selectedRowNumber == rowNumber)
        {
            selectedRowNumber = -1;
            clickedEvents.Add("Selected Row: None");
            return string.Empty;
        }
        else if (makerTable.SelectedItem != null && makerTable.SelectedItem.Equals(maker))
        {
            selectedRowNumber = rowNumber;
            clickedEvents.Add($"Selected Row: {rowNumber}");
            return "selected";
        }
        else
        {
            return string.Empty;
        }
    }

    /// <summary>
    /// Méthode pour trouver les modèles en fonction du nom de fabriquant
    /// </summary>
    /// <param name="name">Maker Name</param>
    /// <returns></returns>

    protected async Task FindModel(int id)
    {
        _processing = true;
        ModelsResponse = await makerService.GetModelsForMakeIdYearAsync(id, null, null);
        if (ModelsResponse.Results != null)
        {
            ModelsView = ModelsResponse.Results.ToList();
        }
        _processing = false;
        await InvokeAsync(StateHasChanged);
    }


    protected void SearchChanged(string searchText)
    {
        if (!string.IsNullOrEmpty(searchText))
        {
            StateHasChanged();
        }
    }
    #endregion

}
