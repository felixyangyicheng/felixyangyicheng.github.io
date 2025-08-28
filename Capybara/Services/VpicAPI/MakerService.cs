using ApexCharts;
using BlazorComponentUtilities;
using Capybara.Models.VPIC;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using static MudBlazor.Icons.Custom;

namespace Capybara.Services.VpicAPI;

public class MakerService :  IMakerService
{
    protected string VpicAPI ="";

    protected HttpClient _httpClient = new HttpClient();
    public MakerService(IConfiguration configuration, HttpClient httpClient) 
    {
       
        _httpClient = httpClient;
        VpicAPI = configuration.GetValue<string>("vpicApiRootPath") ?? throw new ArgumentNullException(nameof(VpicAPI));
    }

    public async Task<Response<List<Maker>>> GetAllMakersAsync()
    {
        string url = $"{VpicAPI}/getallmakes?format=json";
        Response<List<Maker>> response = (await _httpClient.GetFromJsonAsync<Response<List<Maker>>>(url))?? throw new NoNullAllowedException("http response is null");
        return response;
    }

    public async Task<Response<List<Maker>>> GetMakersForVehicleTypeAsync()
    {
        string url = $"{VpicAPI}/GetMakesForVehicleType/Motorcycle?format=json";
        Response<List<Maker>> response = (await _httpClient.GetFromJsonAsync<Response<List<Maker>>>(url)) ?? throw new NoNullAllowedException("http response is null");
        return response; 
    }

    public async Task<Response<List<Model>>> GetModelsForMakeIdYearAsync(int makeId, int? modelyear, string? vehicleType)
    {
        string url = $"{VpicAPI}/GetModelsForMakeIdYear/makeid/{makeId}";
        if (modelyear!=null)
        {
            url=url+($"/modelyear/{modelyear}");
        }
        if (!String.IsNullOrEmpty(vehicleType))
        {
            url = url + ($"/vehicleType/{vehicleType}");
        }
        else
        {
            url = url + ($"/vehicleType/motorcycle");
        }
        url = url + "?format=json";

        Console.WriteLine(url);
        Response <List<Model>> response = (await _httpClient.GetFromJsonAsync<Response<List<Model>>>(url)) ?? throw new NoNullAllowedException("http response is null");
        return response;
    }

    public async Task<Response<List<Model>>> GetModelsForMakersAsync(string brand)
    {
        string url = $"{VpicAPI}/getmodelsformake/{brand}?format=json";
        Response <List<Model>> response = (await _httpClient.GetFromJsonAsync<Response<List<Model>>>(url)) ?? throw new NoNullAllowedException("http response is null");
        return response;
    }
}
