import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Message } from './../../../../shared/models/message.model'
@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  sendId: string;
  recipientId: string;
  content = {} as Message;
  submitBtnStatus = false;


  constructor(public dialogRef: MatDialogRef<SendMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {    
    this.sendId = this.data.senderId;
    this.recipientId = this.data.recipientId;
  }

  sendMessage(form){
    if(form.valid){
      console.log(form.value)
    }
  }


}
