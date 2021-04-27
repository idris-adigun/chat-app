import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { MatModule } from '../../../module/mat/mat.module';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { MyContactComponent } from './my-contact/my-contact.component';
import { SendMessageComponent } from './send-message/send-message.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ContactComponent, 
    ViewContactComponent, 
    AddContactComponent, 
    MyContactComponent, 
    SendMessageComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class ContactModule { }
