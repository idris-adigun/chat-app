import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/shared/models/message.model';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';

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
  messages : Message[]
  messageSub;
  firstRetrieve;

  constructor(private messageService : MessageService,private route: ActivatedRoute){
    this.conversation_id = this.route.snapshot.queryParamMap.get("id")
    this.route.queryParamMap.subscribe(queryParams => {
      this.conversation_id = queryParams.get("id")
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
}
