import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { MessageService } from 'src/app/services/message/message.service';
import { Conversation } from 'src/app/shared/models/conversation.model';
import { Message } from './../../../../shared/models/message.model'
@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  senderId: string;
  recipientId: string;
  content = {} as Message;
  submitBtnStatus = false;
  member = {};

  conversationId: string;
  conversation = {} as Conversation;
  conversationServiceSub; //use to manage subscription to conversation services


  constructor(public dialogRef: MatDialogRef<SendMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private conversationService: ConversationService, private messageService: MessageService) { }

    ngOnInit(): void {    
      this.senderId = this.data.senderId;
      this.recipientId = this.data.recipientId;
    }

    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      // this.conversationServiceSub.unsubscribed(); //Unsubscribed from conversation service when component is destroyed
      
    }

    // Create a unique conversation Id using the sender and recipient's id
    createConversationId(senderId, recipientId){
      let id1 = senderId.substring(0, 13);
      let id2 = recipientId.substring(0, 13);
      return id1 > id2 ? id1.concat(id2) : id2.concat(id1)
    }


    formatConversation(message) : Conversation{
      return {
        uid: this.conversationId,
        lastMessage: message,
        lastUpdated: new Date(),
        member: [this.senderId, this.recipientId]
      }
    }

    formatMessage(message) : Message{
      return {
        sender: this.senderId,
        recipient: this.recipientId,
        date_sent: new Date(),
        message: message
      }
    }

  sendMessage(form){
    if(form.valid){
      this.conversationId = this.createConversationId(this.senderId, this.recipientId);
      let conversation = this.formatConversation(form.value.message);
      let message = this.formatMessage(form.value.message);

      // Check If conversation exist before creating a new one and adding message
     this.conversationServiceSub =  this.conversationService.checkConversation(conversation.uid).pipe(first()).subscribe(res =>{
        let data = res;
          data.length > 0 ? 
          this.updateConversation(conversation.uid, form.value.message, message.date_sent) 
          : this.startNewConversation(conversation);
      }, (error) => {
        console.log(error)
      })
      this.addMessage(message);
    }
  }

  updateConversation(conversationId, lastMessage, lastUpdated){
    console.log('Conversation already exist, updating conversation')
    this.conversationService.updateConversation(conversationId, lastMessage, lastUpdated)
  }

  
  startNewConversation(conversation){
    this.conversationService.startConversation(conversation, this.conversationId).then(res => {
      console.log(res)
    }).catch(e => console.log(e));

  }

  addMessage(message){
    this.messageService.addMessage(message, this.conversationId).then(res => {
      this.dialogRef.close()
    }, (error) => {
      console.log(error)
    })
  }



}
