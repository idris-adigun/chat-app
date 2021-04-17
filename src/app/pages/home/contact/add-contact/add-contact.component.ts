import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from './../../../../services/contact/contact.service';
import { UserProfile } from '../../../../shared/models/user.model';
import { Contact } from '../../../../shared/models/contact.model';
import { Select } from '@ngxs/store';
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
  users: UserProfile[];
  contact = {} as Contact;

  submitBtnStatus : boolean = false;

  constructor(private contactService : ContactService) { 
  }

  ngOnInit(): void {
  }

  searchDirectory(form){
    if(form.valid){
      this.submitBtnStatus = true;
      this.getUserId().then(uid => {
        this.contactService.searchDirectory(form.value.username, uid).subscribe(
          res => {
            this.users = res;
            console.log(this.users);
            this.submitBtnStatus = false;
          }
        )
      });
  }
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


  addToContact(user: Contact){
    let currDate = new Date();
    this.contact =  {
      uid: user.uid,
      dateAdded: currDate
    }
    console.log(this.contact)
    this.getUserId().then(uid => {
      this.contactService.addToContact(this.contact, uid).then(
        res=> console.log(res)
      );

    })
  }

}
