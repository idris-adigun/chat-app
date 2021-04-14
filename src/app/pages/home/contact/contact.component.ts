import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewContactComponent } from './view-contact/view-contact.component'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  myColor="#fff";
  contacts = [
    {
      id: 'dafhsdhshdh',
      username: 'Kelly',
      profile_url: 'https://source.unsplash.com/random/200x200?sig=1',
      dateAdded: new Date()
    },
    {
      id: 'dafhsdhshdh',
      username: 'John',
      profile_url: 'https://source.unsplash.com/random/200x200?sig=2',
      dateAdded: new Date()
    }
  ]
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(contact): void {
   this.dialog.open(ViewContactComponent, {
      width: '500px',
      data: contact
    });
    
  }

}
