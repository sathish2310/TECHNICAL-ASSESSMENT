import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { AddContactRequest } from '../models/add-contact-request.model';
import { Contact } from '../models/contact.model';
import { UpdateContactRequest } from '../models/update-contact-request.model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  editContactSubscription?: Subscription;
  contact?: Contact;

  constructor(private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          // get the data from the API for this category Id
          this.contactService.getContactById(this.id)
          .subscribe({
            next: (response) => {
              this.contact = response;
            }
          });

        }
      }
    });
  }

  onFormSubmit(): void {
    const updateContactRequest: UpdateContactRequest = {
      firstName: this.contact?.firstName ?? '',
      lastName: this.contact?.lastName ?? '',
      email: this.contact?.email ?? '',
      phoneNumber: this.contact?.phoneNumber ?? '',
      address: this.contact?.address ?? '',
      city: this.contact?.city ?? '',
      state: this.contact?.state ?? '',
      country: this.contact?.country ?? '',
      postalCode: this.contact?.postalCode ?? ''
    };

    // pass this object to service
    if (this.id) {
      this.editContactSubscription = this.contactService.updateContact(this.id, updateContactRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('');
        }
      });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.contactService.deleteContact(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editContactSubscription?.unsubscribe();
  }
}
