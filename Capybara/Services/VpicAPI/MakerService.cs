using Capybara.Models.VPIC;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;

namespace Capybara.Services.VpicAPI;

public class MakerService :  IMakerService
{
    protected string VpicAPI ="";
    protected IConfiguration _configuration=default!;
    protected HttpClient _httpClient = new HttpClient();
    public MakerService(IConfiguration configuration, HttpClient httpClient, string vpicAPI) 
    {
        _configuration = configuration;
        _httpClient = httpClient;
        VpicAPI = _configuration.GetValue<string>("vpicApiRootPath") ?? throw new ArgumentNullException(nameof(VpicAPI));
    }

    public async Task<Response<List<Maker>>> GetAllMakersAsync()
    {

        Response<List<Maker>> response = (await _httpClient.GetFromJsonAsync<Response<List<Maker>>>($"{VpicAPI}/getallmakes?format=json"))?? throw new NoNullAllowedException("http response is null");
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
