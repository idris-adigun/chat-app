import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/shared/models/message.model';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store'; 
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @Select() userProfile$;
  uid: string = '';
  conversation;
  conversation_id: string;
  content = {} as Message;
  messages : Message[]
  messageSub;
  conversationServiceSub;
  firstRetrieve;
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

    scrollHandler(e) {
    // console.log(e)
    // should log top or bottom
    if(e === 'top'){
      console.log('reached top, load more')
    }
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
    this.messageSub = this.messageService.getMessages(this.conversation_id).subscribe(
      (res: any) => {
        this.messages = res;
        
        this.firstRetrieve = this.messages[0].date_sent;
        // console.log(this.firstRetrieve)
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
          message: form.value.message,
          conversationId: this.conversation_id
      }
      this.messageService.addMessage(this.content).then(res => console.log(res));
      
      form.reset();
    }
  }
}
