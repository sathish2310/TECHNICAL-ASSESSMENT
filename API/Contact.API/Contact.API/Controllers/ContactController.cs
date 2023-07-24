using Azure.Core;
using Contact.API.DTO;
using Contact.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Data;
using System.Diagnostics.Metrics;
using System.Net;

namespace Contact.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactRepo contactRepo;

        public ContactController(IContactRepo _contactRepo)
        {
            contactRepo = _contactRepo;
        }


        [HttpPost]
        public async Task<IActionResult> CreateContact([FromBody] CreateContactRequestDto request)
        {
            // Map DTO to Domain Model
            var contact = new Models.Contact
            {

                FirstName = request.FirstName,

                LastName = request.LastName,

                Email = request.Email,

                PhoneNumber = request.PhoneNumber,

                Address = request.Address,

                City = request.City,

                State = request.State,

                Country = request.Country,

                PostalCode = request.PostalCode
            };

            await contactRepo.CreateAsync(contact);

            // Domain model to DTO
            var response = new ContactDto
            {
                Id = contact.Id,
                FirstName = request.FirstName,

                LastName = request.LastName,

                Email = request.Email,

                PhoneNumber = request.PhoneNumber,

                Address = request.Address,

                City = request.City,

                State = request.State,

                Country = request.Country,

                PostalCode = request.PostalCode,
            };

            return Ok(response);
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            var contacts = await contactRepo.GetAllAsync();
            // Map Domain model to DTO
            var response = new List<ContactDto>();
            foreach (var contact in contacts)
            {
                response.Add(new ContactDto
                {
                    Id = contact.Id,
                    FirstName = contact.FirstName,

                    LastName = contact.LastName,

                    Email = contact.Email,

                    PhoneNumber = contact.PhoneNumber,

                    Address = contact.Address,

                    City = contact.City,

                    State = contact.State,

                    Country = contact.Country,

                    PostalCode = contact.PostalCode,
                });
            }

            return Ok(response);
        }

       
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetContactById([FromRoute] Guid id)
        {
            var existingContact = await contactRepo.GetById(id);

            if (existingContact is null)
            {
                return NotFound();
            }

            var response = new ContactDto
            {
                Id = existingContact.Id,
                FirstName = existingContact.FirstName,

                LastName = existingContact.LastName,

                Email = existingContact.Email,

                PhoneNumber = existingContact.PhoneNumber,

                Address = existingContact.Address,

                City = existingContact.City,

                State = existingContact.State,

                Country = existingContact.Country,

                PostalCode = existingContact.PostalCode
            };

            return Ok(response);
        }

      
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> EditContact([FromRoute] Guid id, UpdateContactRequestDto request)
        {
            // Convert DTO to Domain Model
            var contact = new Models.Contact
            {
                Id = id,
                FirstName = request.FirstName,

                LastName = request.LastName,

                Email = request.Email,

                PhoneNumber = request.PhoneNumber,

                Address = request.Address,

                City = request.City,

                State = request.State,

                Country = request.Country,

                PostalCode = request.PostalCode
            };

            contact = await contactRepo.UpdateAsync(contact);

            if (contact == null)
            {
                return NotFound();
            }

            // Convert Domain model to DTO
            var response = new ContactDto
            {
                Id = contact.Id,
                FirstName = contact.FirstName,

                LastName = contact.LastName,

                Email = contact.Email,

                PhoneNumber = contact.PhoneNumber,

                Address = contact.Address,

                City = contact.City,

                State = contact.State,

                Country = contact.Country,

                PostalCode = contact.PostalCode
            };


            return Ok(response);
        }


       
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteContact([FromRoute] Guid id)
        {
            var contact = await contactRepo.DeleteAsync(id);

            if (contact is null)
            {
                return NotFound();
            }

            // Convert Domain model to DTO

            var response = new ContactDto
            {
                Id = contact.Id,
                FirstName = contact.FirstName,

                LastName = contact.LastName,

                Email = contact.Email,

                PhoneNumber = contact.PhoneNumber,

                Address = contact.Address,

                City = contact.City,

                State = contact.State,

                Country = contact.Country,

                PostalCode = contact.PostalCode
            };

            return Ok(response);
        }
    }
}
