import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../../shared/models/message.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageCollection: AngularFirestoreCollection<Message>

  constructor(private afs: AngularFirestore) { }

  addMessage(message: Message){
    this.messageCollection = this.afs.collection<Message>('Message');
    return this.messageCollection.add(message);
  }

  // Get all messages based on conversation id
  getMessages(conversationId){
    this.messageCollection = this.afs.collection<Message>('Message', 
    ref => ref.where('conversationId', '==', conversationId).orderBy('date_sent', 'desc').limit(5));

    return this.messageCollection.snapshotChanges().pipe(
      map(messages => messages.map(res => {
        let startAt  = res.payload.newIndex
        // console.log(res.payload.newIndex)
        const data = res.payload.doc.data() as Message;
        return data
      }))
    )
  }

  getMoreMessages(conversationId, startAt){
    this.messageCollection = this.afs.collection<Message>('Message', 
    ref => ref.where('conversationId', '==', conversationId).where('date_sent', '<', startAt).orderBy('date_sent', 'desc').limit(5));

    return this.messageCollection.snapshotChanges().pipe(
      map(actions => actions.map(res => {
        const data = res.payload.doc.data() as Message;
        return data
      }))
    )
  }

}
