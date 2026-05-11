namespace Capybara.Services.VpicAPI
{
    public interface IMakerService
    {
         Task<Response<List<Maker>>> GetAllMakersAsync();
         Task<Response<List<Maker>>> GetMakersForVehicleTypeAsync();
        Task<Response<List<Model>>> GetModelsForMakersAsync(string brand);
        Task<Response<List<Model>>> GetModelsForMakeIdYearAsync(int makeId, int? modelyear, string? vehicleType);
        
    }
}
