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
    ref => ref.where('conversationId', '==', conversationId).orderBy('date_sent', 'asc'));

    return this.messageCollection.snapshotChanges().pipe(
      map(actions => actions.map(res => {
        const data = res.payload.doc.data() as Message;
        return data
      }))
    )
  }

}
