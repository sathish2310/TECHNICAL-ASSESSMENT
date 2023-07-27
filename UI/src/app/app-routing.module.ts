import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './Contact/contact-list/contact-list.component';
import { AddContactComponent } from './Contact/add-contact/add-contact.component';
import { EditContactComponent } from './Contact/edit-contact/edit-contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent
  },
  {
    path: 'contacts',
    component: ContactListComponent
  },
  {
    path: 'contacts/add',
    component: AddContactComponent
  },
  {
    path: 'contacts/edit/:id',
    component: EditContactComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
