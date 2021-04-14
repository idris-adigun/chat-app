import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { MatModule } from '../../../module/mat/mat.module';
import { ViewContactComponent } from './view-contact/view-contact.component';


@NgModule({
  declarations: [ContactComponent, ViewContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatModule
  ]
})
export class ContactModule { }
