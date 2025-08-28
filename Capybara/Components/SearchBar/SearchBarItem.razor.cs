namespace Capybara.Components.SearchBar;

public partial class SearchBarItem
{
    /// <summary>
    /// chaine de caractère pour petites notes
    /// </summary>
    [Parameter]
    public string PlaceHolder { get; set; } = "";

    /// <summary>
    /// chaine de caractère de recherche
    /// </summary>
    public string SearchTerm { get; set; } = "";
    /// <summary>
    /// Parametre: notification de chaine de caractère de recherche
    /// </summary>
    [Parameter]
    public EventCallback<string> OnSearchChanged { get; set; }

}
