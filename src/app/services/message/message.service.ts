import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../../shared/models/message.model';
import { Conversation } from '../../shared/models/conversation.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageCollection: AngularFirestoreCollection<Message>

  constructor(private afs: AngularFirestore) { }

  addMessage(message: Message, conversationId){
    this.messageCollection = this.afs.collection<Message>('Conversation').doc(conversationId).collection('Messages');
    return this.messageCollection.add(message);
  }

  // Get all messages based on conversation id
  getMessages(conversationId){
    this.messageCollection = this.afs.collection<Message>('Conversation').doc(conversationId).collection('Messages', 
    ref => ref.orderBy('date_sent', 'desc').limit(5))

    return this.messageCollection.snapshotChanges().pipe(
      map(messages => messages.map(res => {
        const data = res.payload.doc.data() as Message;
        return data
      }))
    )
  }

  getMoreMessages(conversationId, lastRetrieveDate){
    
    this.messageCollection = this.afs.collection<Message>('Conversation').doc(conversationId).collection('Messages', 
    ref => ref.where('date_sent', '<', lastRetrieveDate).orderBy('date_sent', 'desc').limit(5))

    return this.messageCollection.snapshotChanges().pipe(
      map(actions => actions.map(res => {
        const data = res.payload.doc.data() as Message;
        return data
      }))
    )
  }

}
