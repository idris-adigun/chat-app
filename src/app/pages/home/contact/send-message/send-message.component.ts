import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { Conversation } from 'src/app/shared/models/conversation.model';
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
  memeber = [];
  conversation = {} as Conversation;


  constructor(public dialogRef: MatDialogRef<SendMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private conversationService: ConversationService) { }

    ngOnInit(): void {    
      this.sendId = this.data.senderId;
      this.recipientId = this.data.recipientId;
    }

  sendMessage(form){
    if(form.valid){
      this.memeber.push(this.sendId)
      this.memeber.push(this.recipientId)
      form.value.dateSent = new Date();
      let conversation = {
        member: this.memeber,
        message: form.value,
        lastMessage: form.value,
        lastUpdated: new Date()
      }
      this.conversationService.startConversation(conversation).then(res => {
        console.log(res)
      }).catch(e => console.log(e))
    }
  }


}
