
import { Component, OnDestroy } from '@angular/core';
import { AddContactRequest } from '../models/add-contact-request.model';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnDestroy {
  model: AddContactRequest;
  
  private addContactSubscribtion?: Subscription;
  constructor(private contactService: ContactService,
    private router: Router) {
    this.model = {
      firstName:'',
      lastName:'',
      email:'',
      phoneNumber:'',
      address:'',
      city:'',
      state:'',
      country:'',
      postalCode:''
    };
  }
  onFormSubmit() {
    this.addContactSubscribtion = this.contactService.addContact(this.model)
    .subscribe({
      next: (response) => {
        
        this.router.navigateByUrl('/contacts');
      }
    })
    alert("Saved Successfully");
  }
  ngOnDestroy(): void {
    this.addContactSubscribtion?.unsubscribe();
  }

}
