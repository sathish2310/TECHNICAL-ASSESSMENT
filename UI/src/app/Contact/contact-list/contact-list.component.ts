import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts$?: Observable<Contact[]>;

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.contacts$ = this.contactService.getAllContacts();
  }
}
