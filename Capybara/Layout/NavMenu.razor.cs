using System.IO;



namespace Capybara.Layout
{
    public partial class NavMenu
    {
        public class DocItem
        {
            public string Title { get; set; } = string.Empty;
            public string Url { get; set; } = string.Empty;
            public bool IsFolder { get; set; }
            public List<DocItem> Children { get; set; } = new();
        }

        [Inject] private HttpClient Http { get; set; } = default!;
        private List<DocItem>? docs;

        protected override async Task OnInitializedAsync()
        {
            try
            {
                var wrapper = await Http.GetFromJsonAsync<DocItem>("docs/nav-structure.json");
                docs = wrapper?.Children ?? new List<DocItem>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur de chargement : {ex.Message}");
            }
        }

        private RenderFragment BuildNav(DocItem item) => builder =>
        {
            var index = 0;

            if (item.IsFolder)
            {
                builder.OpenComponent<MudNavGroup>(index++);
                builder.AddAttribute(index++, "Title", item.Title);
                builder.AddAttribute(index++, "Icon", Icons.Material.Rounded.Folder);
                builder.AddAttribute(index++, "Expanded", false);

                builder.AddAttribute(index++, "ChildContent", (RenderFragment)(childBuilder =>
                {
                    foreach (var child in item.Children)
                    {
                        childBuilder.AddContent(index++, BuildNav(child));
                    }
                }));

                builder.CloseComponent();
            }
            else
            {
                builder.OpenComponent<MudNavLink>(index++);
                builder.AddAttribute(index++, "Href", item.Url);
                builder.AddAttribute(index++, "Icon", Icons.Material.Rounded.Description);
                builder.AddAttribute(index++, "IconColor", Color.Info);

                builder.AddAttribute(index++, "ChildContent", (RenderFragment)(childBuilder =>
                {
                    childBuilder.AddContent(index++, item.Title);
                }));

                builder.CloseComponent();
            }
        };
    }
}
