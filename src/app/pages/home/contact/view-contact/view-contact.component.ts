import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ViewContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
    contact: any;

  ngOnInit(): void {
    this.contact = this.data
    console.log(this.contact)
  }

}
