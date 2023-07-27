using Microsoft.EntityFrameworkCore;
using Contact.API.Models;
namespace Contact.API.Models
{
    public class ContactRepo : IContactRepo
    {

        private readonly ContactDBContext dbContext;

        public ContactRepo(ContactDBContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Contact> CreateAsync(Contact contact)
        {
            await dbContext.Contacts.AddAsync(contact);
            await dbContext.SaveChangesAsync();

            return contact;
        }

        public async Task<Contact?> DeleteAsync(Guid id)
        {
            var existingContact = await dbContext.Contacts.FirstOrDefaultAsync(x => x.Id == id);

            if (existingContact is null)
            {
                return null;
            }

            dbContext.Contacts.Remove(existingContact);
            await dbContext.SaveChangesAsync();
            return existingContact;
        }

        public async Task<IEnumerable<Contact>> GetAllAsync()
        {
            return await dbContext.Contacts.OrderByDescending(x => x.Id).ToListAsync();
        }

        public async Task<Contact?> GetById(Guid id)
        {
            return await dbContext.Contacts.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async  Task<Contact?> UpdateAsync(Contact category)
        {
            var existingContact = await dbContext.Contacts.FirstOrDefaultAsync(x => x.Id == category.Id);

            if (existingContact != null)
            {
                dbContext.Entry(existingContact).CurrentValues.SetValues(category);
                await dbContext.SaveChangesAsync();
                return category;
            }

            return null;
        }
    }
}
