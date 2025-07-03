using GestionClient.Models;

namespace GestionClient.Repositories
{
    public interface IClientRepository
    {
        Task<IEnumerable<Client>> GetClients();
        Task<Client> GetClientById(int id);
        Task<Client> AddClient(Client client);
        Task<Client> UpdateClient(Client client);
        Task DeleteClient(int id);
    }
}
