using System;
using System.Net.Http;
using System.Threading.Tasks;
using Capybara.HashCheckService;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;


var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.Services.AddSingleton<IConfiguration>(new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .Build());
#if DEBUG
builder.Services.AddHttpClient("notification.push.srv.local", client =>
    {
        client.BaseAddress = new Uri(builder.Configuration.GetValue<string>("notification.push.srv.local") ?? throw new ArgumentException());
    });
#else
    builder.Services.AddHttpClient("notification.push.srv", client =>
    {
        client.BaseAddress = new Uri(builder.Configuration.GetValue<string>("notification.push.srv") ?? throw new ArgumentException());
    });
#endif
builder.Services.AddHttpClient("fileshare.srv", client =>
{
    client.BaseAddress = new Uri(builder.Configuration.GetValue<string>("fileshare.srv") ?? throw new ArgumentException());
});
builder.Services.AddPWAUpdater();
builder.Services.AddBootstrapBlazor();
builder.Services.AddSingleton<HashServiceFactory>();
builder.Services.AddSpeechSynthesis();

        builder.Services.AddMudServices(config =>
        {
            config.SnackbarConfiguration.PositionClass = Defaults.Classes.Position.BottomLeft;
            config.SnackbarConfiguration.PreventDuplicates = false;
            config.SnackbarConfiguration.NewestOnTop = false;
            config.SnackbarConfiguration.ShowCloseIcon = true;
            config.SnackbarConfiguration.VisibleStateDuration = 2000;
            config.SnackbarConfiguration.HideTransitionDuration = 500;
            config.SnackbarConfiguration.ShowTransitionDuration = 500;
            config.SnackbarConfiguration.SnackbarVariant = Variant.Filled;
        });

await builder.Build().RunAsync();