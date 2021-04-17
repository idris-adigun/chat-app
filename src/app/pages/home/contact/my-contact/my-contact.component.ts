import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ViewContactComponent } from './../view-contact/view-contact.component';
import { Contact } from '../../../../shared/models/contact.model';
import { ContactService } from './../../../../services/contact/contact.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Select } from '@ngxs/store';
import { SendMessageComponent } from '../../components/send-message/send-message.component';

@Component({
  selector: 'app-my-contact',
  templateUrl: './my-contact.component.html',
  styleUrls: ['./my-contact.component.scss']
})
export class MyContactComponent implements OnInit {
  @Select() userProfile$;
  @Select() contact$;
  uid: string = '';
  contacts: Contact[];
  contactDetails = []

  constructor(public dialog: MatDialog, private contactService : ContactService, private authService: AuthService) {
   }

  ngOnInit(): void {
    this.getUserContact();
  }

  getUserContact(){
    this.contact$.subscribe(
      res => {
        this.contacts = res.contact[0]
        this.contacts.forEach(contact => this.getContactDetails(contact.uid))
      }
    )
  }

  getUserId(){
    return new Promise<any>((resolve, reject) => {
        this.userProfile$.subscribe(res => {
          res.userProfile.uid ?
            resolve(res.userProfile.uid)
            : reject(null)
        })
    })
  }

  
  openDialog(contact): void {
   this.dialog.open(ViewContactComponent, {
      width: '500px',
      data: contact
    });
  }
  openMessageDialog(contact): void {
    this.getUserId().then(senderId => {
      this.dialog.open(SendMessageComponent, {
         width: '500px',
         data: {
           recipientId: contact.uid,
           senderId: senderId
         }
       });

    })
  }


  getContactDetails(contactID){
    this.authService.getUserProfile(contactID).subscribe(res =>
    {
      console.log(res);
      this.contactDetails.push(res[0])
    })
  }

}
