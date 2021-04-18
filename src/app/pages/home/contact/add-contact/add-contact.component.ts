import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ContactService } from './../../../../services/contact/contact.service';
import { UserProfile } from '../../../../shared/models/user.model';
import { Contact } from '../../../../shared/models/contact.model';
import { Select } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { ViewContactComponent } from '../view-contact/view-contact.component';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  @Select() userProfile$;
  @Select() contact$;
  uid;
  user = {} as UserProfile;
  users;
  contacts: Contact[];
  contact: Contact;

  submitBtnStatus : boolean = false;

  constructor(public dialog: MatDialog, private contactService : ContactService) { 
  }

  ngOnInit(): void {
    this.getUserId();
    this.getContacts();
  }


  getContacts(){
    this.contact$.subscribe(
      res => {
        this.contacts = res.contact[0];
      }
    );
  }

  searchDirectory(form){
    if(form.valid){
      this.submitBtnStatus = true;
      this.contactService.searchDirectory(form.value.username, this.uid).pipe(first()).subscribe(
        res => {
          this.users = res;
          console.log(res)
          this.isUserAdded(res)
          this.submitBtnStatus = false;
        }
      );
    }
  }

  getUserId(){
    this.userProfile$.subscribe(res => {
      this.uid = res.userProfile.uid 
    })
  }


  addToContact(user: Contact){
    let currDate = new Date();
    this.contact =  {
      uid: user.uid,
      dateAdded: currDate
    }
    this.contactService.addToContact(this.contact, this.uid).then(
      res=> console.log(res)
    );
  }

  // Check if contact has already been added
  isUserAdded(user){
    let isFound = false;
    this.contacts.forEach( (contact) => {
      contact.uid === user[0].uid ? isFound = true : ''
    });

    // Set is added to true is user is already a contact and false otherwise5r
    isFound ? user[0].isAdded = true : user[0].isAdded = false
  }

    
  openDialog(contact): void {
    this.dialog.open(ViewContactComponent, {
       width: '300px',
       data: contact
     });
   }

}
