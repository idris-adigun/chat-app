import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
}
