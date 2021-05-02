import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Conversation } from '../../shared/models/conversation.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  conversationCollection: AngularFirestoreCollection<Conversation>

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) { }


  // check if conversation exist 
  checkConversation(conversationId){
      return this.afs.collection<Conversation>('Conversation').doc(conversationId).get();
  }

  // Update Conversation with the latest message and last updated
  updateConversation(conversationId, lastMessage, lastUpdated){
    return this.afs.collection<Conversation>('Conversation').doc(conversationId).update({
        lastUpdated: lastUpdated,
        lastMessage: lastMessage
    })
  }

  // Create Conversation by adding sender and recipient Id to member array
  startConversation(conversation, conversation_id){
      return this.afs.collection<Conversation>('Conversation').doc(conversation_id).set(conversation)
  }

  // Get Conversation the user is a member of
  getConversation(userID){
    this.conversationCollection = this.afs.collection<Conversation>('Conversation', ref => {
      return ref.where('member', 'array-contains', userID);
    });    
    return this.conversationCollection.snapshotChanges().pipe(
      map(actions => actions.map(res => {
        const data = res.payload.doc.data() as Conversation;
        console.log(data)
        return data
      }))
    )

  }

}
