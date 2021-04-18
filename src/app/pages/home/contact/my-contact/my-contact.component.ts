import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ViewContactComponent } from './../view-contact/view-contact.component';
import { SendMessageComponent } from '../send-message/send-message.component';
import { Contact } from '../../../../shared/models/contact.model';
import { ContactService } from './../../../../services/contact/contact.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Select } from '@ngxs/store';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-my-contact',
  templateUrl: './my-contact.component.html',
  styleUrls: ['./my-contact.component.scss']
})
export class MyContactComponent implements OnInit {
  @Select() userProfile$;
  uid: string = '';
  contacts: Contact[];
  contactDetails = []

  constructor(public dialog: MatDialog, private contactService : ContactService, private authService: AuthService) {
   }

  ngOnInit(): void {

    this.getUserId();
    this.getContactDetails();
  }

  getUserId(){
    this.userProfile$.subscribe(res => {
        this.uid = res.userProfile.uid
        this.contacts = res.userProfile.contacts
    });
  }

  
  openDialog(contact): void {
   this.dialog.open(ViewContactComponent, {
      width: '300px',
      data: contact
    });
  }

  openMessageDialog(contact): void {
    this.dialog.open(SendMessageComponent, {
        width: '500px',
        data: {
          recipientId: contact.uid,
          senderId: this.uid
        }
      });
  }


  getContactDetails()
  {
    this.contactDetails = [];
    console.log(this.contacts)
    this.contacts.forEach((contact) => {
      this.authService.getUserProfile(contact.uid).pipe(first()).subscribe(res => {
        this.contactDetails.push(res[0])
      })
    })
  }

}
