using Capybara.Models.VPIC;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;

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
        Console.WriteLine(url);
        string result= await _httpClient.GetStringAsync(url);
        Console.WriteLine(result);

        Response<List<Maker>> response = (await _httpClient.GetFromJsonAsync<Response<List<Maker>>>(url))?? throw new NoNullAllowedException("http response is null");
        return response;
    }

    public async Task<Response<List<Maker>>> GetMakersForVehicleTypeAsync()
    {
        Response<List<Maker>> response = (await _httpClient.GetFromJsonAsync<Response<List<Maker>>>($"{VpicAPI}/GetMakesForVehicleType/Motorcycle?format=json")) ?? throw new NoNullAllowedException("http response is null");
        return response; 
    }

    public async Task<Response<List<Model>>> GetModelsForMakersAsync(string brand)
    {

        Response<List<Model>> response = (await _httpClient.GetFromJsonAsync<Response<List<Model>>>($"{VpicAPI}/getmodelsformake/{brand}?format=json")) ?? throw new NoNullAllowedException("http response is null");
        return response;
    }
}
