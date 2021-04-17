import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactComponent } from './contact.component';
import { MyContactComponent } from './my-contact/my-contact.component';

const routes: Routes = [
  {
    path: '', 
    component: ContactComponent,
    children: [
      {
        path: 'contact',
        component: MyContactComponent
      },
      {
        path: 'add-contact',
        component: AddContactComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
