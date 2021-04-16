import { Component, OnInit } from '@angular/core';
import { ContactService } from './../../../../services/contact/contact.service';
import { User, UserProfile } from '../../../../shared/models/user.model';
import { Contact } from '../../../../shared/models/contact.model';
import { Select } from '@ngxs/store';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  user = {} as UserProfile;
  users: UserProfile[];
  submitBtnStatus : boolean = false;
  @Select() userProfile$;
  uid: string = '';

  constructor(private contactService : ContactService) { 
    this.userProfile$.subscribe(res => {
      this.uid = res.userProfile.uid;
      console.log(this.uid)
    })
  }

  ngOnInit(): void {
  }

  searchDirectory(form){
    if(form.valid){
      this.submitBtnStatus = true;
      this.contactService.getContact(form.value.username, this.uid).subscribe(
        res => {
          this.users = res;
          console.log(this.users);
          this.submitBtnStatus = false;
        }
      )
    }
  }

  sendAddRequest(user: UserProfile){

    this.contactService.sendAddRequest(user, this.uid).then(
      res=> console.log(res)
    )

  }

}
