import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from './../../../../services/contact/contact.service';
import { UserProfile } from '../../../../shared/models/user.model';
import { Contact } from '../../../../shared/models/contact.model';
import { Select } from '@ngxs/store';
import { first } from 'rxjs/operators';
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

  constructor(private contactService : ContactService) { 
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
    this.contacts.forEach( (contact) => {
      contact.uid === user[0].uid ?
        user[0].isAdded = true
        : user[0].isAdded = false
    })
    console.log(user)

  }

}
