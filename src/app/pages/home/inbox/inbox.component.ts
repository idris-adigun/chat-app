import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ConversationService } from 'src/app/services/conversation/conversation.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  // Get userProfile State
  @Select() userProfile$;
  uid: string = '';
  userDetails

  conversations = [];
  constructor(private conversationService: ConversationService) { 
    this.getUserId();
    this.getConversation();
  }

  getUserId(){
    this.userProfile$.subscribe(res => {
        this.uid = res.userProfile.uid;
    });
  }

  getConversation(){
    this.conversationService.getConversation(this.uid).subscribe(res =>{
      this.conversations = res;
    })
  }
  ngOnInit(): void {
    this.userProfile$.subscribe(res => this.userDetails = res)
  }

}
