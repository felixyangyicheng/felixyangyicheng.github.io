namespace Capybara.Components.Lists;
using Microsoft.AspNetCore.Components;
public partial class GenericList<T> where T : class
{

    #region parameters

    /// <summary>
    /// Interaction avec barre de recherche
    /// </summary>
    [Parameter] public EventCallback<string> OnSearchChanged { get; set; }

    /// <summary>
    ///     Obtient ou définit la liste d'élément.
    /// </summary>
    [Parameter]
    public List<T> Items { get; set; } = new List<T>();

    /// <summary>
    ///     Obtient ou définit le nom de la propriété à appeler sur <see cref="T"/>
    ///     pour obtenir la représentation textuelle de l'élément.
    /// </summary>
    [Parameter]
    public string? DisplayMemberPath { get; set; }

    /// <summary>
    ///     Obtient ou définit une référence vers une méthodes qui prend en paramètre
    ///     une instance de <see cref="T"/> et retourne la représentation textuelle de l'élément.
    /// </summary>
    [Parameter]
    public Func<T, string>? DisplaySelector { get; set; }

    /// <summary>
    ///     Obtient ou définit un template pour représenter un élément de type <see cref="T"/>.
    /// </summary>
    [Parameter, NotNull]
    public RenderFragment<T>? ItemTemplate { get; set; }

    /// <summary>
    ///     Obtient ou définit l'élément sélectionné.
    /// </summary>
    [Parameter]
    public T? SelectedItem { get; set; }

    /// <summary>
    ///     Evénement déclenché lorsqu'un élément sélectionné change.
    /// </summary>
    [Parameter]
    public EventCallback<T> SelectedItemChanged { get; set; }
    /// <summary>
    /// header de table
    /// </summary>
    [Parameter]
    public RenderFragment TableHeader { get; set; } = default!;
    /// <summary>
    /// footer de table
    /// </summary>
    [Parameter]
    public RenderFragment TableFooter { get; set; } = default!;

    /// <summary>
    /// Capacité par page
    /// </summary>
    [Parameter]
    public int ItemsPerPage { get; set; } = 5;
    #endregion parameters

    #region properties

    /// <summary>
    /// Page acutelle
    /// </summary>
    private int CurrentPage = 1;
    /// <summary>
    /// liste paginée
    /// </summary>
    private List<T> CurrentDisplay = default!;
    /// <summary>
    /// total des items
    /// </summary>
    private int TotalCount;
    #endregion properties

    #region methods
    /// <summary>
    /// Parametres s'initialisent
    /// </summary>
    protected override void OnParametersSet()
    {
        UpdateDisplay();
        TotalCount = Items.Count();
    }
    /// <summary>
    /// mettre à jour affichage de la liste
    /// </summary>
    private void UpdateDisplay()
    {
        CurrentDisplay = Items.Skip((CurrentPage - 1) * ItemsPerPage).Take(ItemsPerPage).ToList();
    }
    /// <summary>
    /// aller à la dernière page
    /// </summary>
    /// <returns></returns>
    private bool AtLastPage()
    {
        return CurrentPage >= TotalPages();
    }
    /// <summary>
    /// définir les nombres de page en fonction de nombre des items
    /// </summary>
    /// <returns>nombre de page</returns>
    private int TotalPages()
    {
        return Convert.ToInt32(Math.Ceiling(TotalCount / Convert.ToDecimal(ItemsPerPage)));
    }
    /// <summary>
    /// aller dans la première page
    /// </summary>
    private void MoveFirst()
    {
        CurrentPage = 1;
        UpdateDisplay();
    }
    /// <summary>
    /// aller dans la page précédante
    /// </summary>
    private void MoveBack()
    {
        CurrentPage--;
        UpdateDisplay();
    }
    /// <summary>
    /// aller dans la prochaine page
    /// </summary>
    private void MoveNext()
    {
        CurrentPage++;
        UpdateDisplay();
    }
    /// <summary>
    /// aller dans la dernière page
    /// </summary>
    private void MoveLast()
    {
        CurrentPage = TotalPages();
        UpdateDisplay();
    }
    /// <summary>
    /// Selectionner item dans la liste, déléguer à la méthode SelectedItemChanged
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    protected async Task SelectItem(T item)
    {
        if (Items.Contains(item))
        {
            await SelectedItemChanged.InvokeAsync(item);
            StateHasChanged();
        }
    }
    #endregion methods
}