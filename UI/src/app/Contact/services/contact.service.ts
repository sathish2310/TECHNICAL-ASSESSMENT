import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddContactRequest } from '../models/add-contact-request.model';
import { Contact } from '../models/contact.model';
import { UpdateContactRequest } from '../models/update-contact-request.model';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

    getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.apiBaseUrl}/api/Contact`);
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${environment.apiBaseUrl}/api/Contact/${id}`);
  }


  addContact(model: AddContactRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Contact`, model);
  }

  updateContact(id: string, updateContactRequest: UpdateContactRequest) : Observable<Contact> {
    return this.http.put<Contact>(`${environment.apiBaseUrl}/api/Contact/${id}`, updateContactRequest);
    
  }

  deleteContact(id: string) : Observable<Contact> {
    return this.http.delete<Contact>(`${environment.apiBaseUrl}/api/Contact/${id}`)
  }
}
