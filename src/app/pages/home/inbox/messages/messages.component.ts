import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/shared/models/message.model';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store'; 
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { first } from 'rxjs/operators';
import { Directive, HostListener } from '@angular/core'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @Select() userProfile$;
  @ViewChild('conversationDiv') conversationDiv: ElementRef;
  uid: string = '';
  conversation;
  conversation_id: string;
  content = {} as Message;
  message : any;
  messages : any[]
  messageSub;
  conversationServiceSub;
  lastRetrieveDate;
  lastMessageLenght = 5;
  contactUid;

  constructor(private messageService : MessageService,private route: ActivatedRoute, private conversationService: ConversationService){
    this.conversation_id = this.route.snapshot.queryParamMap.get("id")
    this.route.queryParamMap.subscribe(queryParams => {
      this.conversation_id = queryParams.get("id")
    })
    this.contactUid = this.route.snapshot.queryParamMap.get("contact")
    this.route.queryParamMap.subscribe(queryParams => {
      this.contactUid = queryParams.get("contact")
    })


  }

  loadMoreMessages(){

    let lastIndex = this.messages.length;
    this.lastRetrieveDate = this.messages[lastIndex-1].date_sent; //Get the last date on current message

    this.conversationDiv.nativeElement.scroll({
      top: this.conversationDiv.nativeElement.scrollHeight + 100,
      left: 0,
      behavior: 'smooth'
  }) 
    // Check if the lenght of the last messages added is atleast 5
    if(this.lastMessageLenght !== 5){
      console.log('Last Message reached')
    }
    else{
      this.messageService.getMoreMessages(this.conversation_id, this.lastRetrieveDate).pipe(first()).subscribe(res => {
        console.log(res)
        if(res.length > 0){
          this.lastMessageLenght = res.length;
          let updatedMessages = this.messages.concat(res);
          let lastIndex = this.messages.length;
          this.lastRetrieveDate = updatedMessages[lastIndex-1].date_sent;
          console.log(this.lastRetrieveDate)
          this.messages = updatedMessages;
        }
        else{
          console.log('No more messages')
        }
      });
    }
    // }
  }
 
  ngOnInit():void {
    this.getUserId();
    this.getMessage();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.messageSub.unsubscribe();
  }


  // get user Id from NGXS state
  getUserId(){
    this.userProfile$.subscribe(res => {
      this.uid = res.userProfile.uid 
    })
  }

  getMessage(){
    // this.messageService.getMessages(this.conversation_id)
    this.messageSub = this.messageService.getMessages(this.conversation_id).subscribe(
      (res: any) => {
        console.log(res)
        this.messages = res;
      },
      error => {
        console.log('unable to retrieve messages', error);
      }
    )
  }

  
  sendMessage(form){
    if(form.valid){
      console.log(form.value.message)
      this.content ={
          sender: this.uid,
          recipient: this.contactUid,
          date_sent: new Date(),
          message: form.value.message
      }
      this.messageService.addMessage(this.content, this.conversation_id).then(res => {
        if(res){
          console.log(`Update last message with ${this.content.message}`)
          this.conversationService.updateConversation(this.conversation_id, this.content.message, this.content.date_sent).then(
            res => {
              console.log(res)
            }
          )
        }
        //update message conversation date and last message
      })
      .catch(error => {
        console.log(error)
      });
      form.reset();
    }
  }
}
