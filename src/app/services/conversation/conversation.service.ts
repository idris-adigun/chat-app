import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Conversation } from '../../shared/models/conversation.model';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  conversationCollection: AngularFirestoreCollection<Conversation>

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) { }

  // Create Conversation by adding sender and recipient Id to member array
  startConversation(conversation){
    this.conversationCollection = this.afs.collection<Conversation>('Conversation');
    return new Promise<any>((resolve, reject) => {
      this.conversationCollection.add(conversation).then(
        res => resolve(res)
      ).catch(e => reject(e))
    })
  }

  //update conversation last message and dateUpdate

  // Add message to conversation by checking if sender and recipient are part of the member array of the conversation
}
