import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewContactComponent } from './../view-contact/view-contact.component';
import { Contact } from '../../../../shared/models/contact.model';
import { ContactService } from './../../../../services/contact/contact.service';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-my-contact',
  templateUrl: './my-contact.component.html',
  styleUrls: ['./my-contact.component.scss']
})
export class MyContactComponent implements OnInit {
  @Select() userProfile$;
  uid: string = '';
  contacts: Contact[];

  constructor(public dialog: MatDialog, private contactService : ContactService) {
    this.userProfile$.subscribe(res => {
      this.uid = res.userProfile.uid;
    });
   }

  ngOnInit(): void {
      this.getContact();
  }
  
  openDialog(contact): void {
   this.dialog.open(ViewContactComponent, {
      width: '500px',
      data: contact
    });
    
  }

  getContact(){
    this.contactService.getMyContact(this.uid).subscribe( res => {
      this.contacts = res;
      console.log(this.contacts)
    })
  }

}
