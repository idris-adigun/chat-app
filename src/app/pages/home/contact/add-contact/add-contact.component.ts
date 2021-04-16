import { Component, OnInit } from '@angular/core';
import { ContactService } from './../../../../services/contact/contact.service';
import { Contact } from '../../../../shared/models/contact.model';
import { Select } from '@ngxs/store';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  contact = {} as Contact;
  contacts: Contact[];
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
          this.contacts = res;
          console.log(this.contacts);
          this.submitBtnStatus = false;
        }
      )
    }
  }

}
