namespace Capybara.Services.VpicAPI
{
    public interface IMakerService
    {
         Task<Response<List<Maker>>> GetAllMakers();
         Task<Response<List<Maker>>> GetMakersForVehicleType();
        Task<Response<List<Model>>> GetModelsForMakers(string brand);
    }
}
