namespace Contact.API.Models
{
    public interface IContactRepo
    {
        Task<Contact> CreateAsync(Contact contact);

        Task<IEnumerable<Contact>> GetAllAsync();

        Task<Contact?> GetById(Guid id);

        Task<Contact?> UpdateAsync(Contact category);

        Task<Contact?> DeleteAsync(Guid id);
    }
}
