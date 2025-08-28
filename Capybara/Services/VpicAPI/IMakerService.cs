namespace Capybara.Services.VpicAPI
{
    public interface IMakerService
    {
         Task<Response<List<Maker>>> GetAllMakersAsync();
         Task<Response<List<Maker>>> GetMakersForVehicleTypeAsync();
        Task<Response<List<Model>>> GetModelsForMakersAsync(string brand);
    }
}
