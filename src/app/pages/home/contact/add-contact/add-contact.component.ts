import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ContactService } from './../../../../services/contact/contact.service';
import { UserProfile } from '../../../../shared/models/user.model';
import { Contact } from '../../../../shared/models/contact.model';
import { Select } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { ViewContactComponent } from '../view-contact/view-contact.component';
import { setUserProfile } from 'src/app/shared/actions/user.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  @Select() userProfile$;
  uid;
  user = {} as UserProfile;
  userProfile = {} as UserProfile;
  users;
  contacts: Contact[];
  contact: Contact;

  submitBtnStatus : boolean = false;

  constructor(public dialog: MatDialog, private contactService : ContactService, private store: Store) { 
  }

  ngOnInit(): void {
    this.getUserId();
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
      this.userProfile = res.userProfile;
      this.uid = res.userProfile.uid 
      this.contacts = [res.userProfile.contacts]
    })
  }


  addToContact(user: Contact){
    let currDate = new Date();
    this.contact =  {
      uid: user.uid,
      dateAdded: currDate
    }
    // Push the new contact into the userProfile contact array
    this.userProfile.contacts.push(this.contact)
    this.contactService.addToContact(this.contact, this.uid).then(
      res=> {
        console.log(res)
        this.setUserProfile(this.userProfile)

      }
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
     // Add user profile to the state
  setUserProfile(userProfile: UserProfile){
    this.store.dispatch(new setUserProfile(userProfile))
  }

}
