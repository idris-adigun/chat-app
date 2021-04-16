import { Component, OnInit } from '@angular/core';
import { ContactService } from './../../../../services/contact/contact.service';
import { Contact } from '../../../../shared/models/contact.model';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  contact = {} as Contact;
  contacts: Contact[];
  submitBtnStatus : boolean = false;
  constructor(private contactService : ContactService) { }

  ngOnInit(): void {
  }

  // TODO: Filter out user by requester id and if already added to My Contact
  searchDirectory(form){
    if(form.valid){
      this.submitBtnStatus = true;
      this.contactService.getContact(form.value.username).subscribe(
        res => {
          this.contacts = res;
          console.log(this.contacts);
          this.submitBtnStatus = false;
        }
      )
    }
  }

}
