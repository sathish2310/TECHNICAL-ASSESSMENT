using Microsoft.EntityFrameworkCore;

namespace Contact.API.Models
{
    public class ContactDBContext :  DbContext
    {
        public ContactDBContext(DbContextOptions<ContactDBContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
