import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { Conversation } from 'src/app/shared/models/conversation.model';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  // Get userProfile State
  @Select() userProfile$;
  uid: string = '';
  userDetails;
  conversationSub;

  conversations : Conversation [];
  filteredconversations : Conversation [];
  constructor(private conversationService: ConversationService) { 
    this.getUserId();
    this.getConversation();
  }
  ngOnInit(): void {
    this.userProfile$.subscribe(res => this.userDetails = res)
  }

  ngOnDestroy(){
    // Subscribe from conversation when component is destryoed
    this.conversationSub.unsubscribe()
    console.log('unsubscribed from conversation')
  }

  // get user id from state
  getUserId(){
    this.userProfile$.subscribe(res => {
        this.uid = res.userProfile.uid;
        console.log(this.uid)
    });
  }
  // get all users conversation user is a memeber of
  getConversation(){
    this.conversationSub = this.conversationService.getConversation(this.uid).pipe(first()).subscribe(res =>{
      if(res.length > 0){
        this.conversations = res;
        this.filterOutCurrentUser()
      }
      else{
        console.log('No conversation found!')
      }
    },
    error => {
      console.log('Unable to retrieved Conversation')
    })
  }


  filterOutCurrentUser(){
    console.log(this.conversations)
     this.filteredconversations = this.conversations.map((conversation => {
      return {...conversation, member: conversation.member.filter((id => id !== this.uid))}
     }));
  }

  //For each memebers in the conversation, get their profile details






  // TODO: remove current user id from contact members

}
