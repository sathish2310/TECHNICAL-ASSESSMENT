import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContactComponent } from './Contact/add-contact/add-contact.component';
import { ContactListComponent } from './Contact/contact-list/contact-list.component';
import { EditContactComponent } from './Contact/edit-contact/edit-contact.component';
import { ContactService } from './Contact/services/contact.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddContactComponent,
    ContactListComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
