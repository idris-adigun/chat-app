import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contact } from '../../shared/models/contact.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactCollection: AngularFirestoreCollection<Contact>
  contacts: Observable<Contact[]>;
  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) { }

  // get contact by username
  getContact(userName){
    console.log(userName)
    this.contactCollection = this.afs.collection<Contact>('UserProfile', ref => {
      return ref.where('username', '==', userName)
    });
    return this.contactCollection.snapshotChanges().pipe(
        map(actions => actions.map(res => {
          const data = res.payload.doc.data() as Contact;
          return data
        }))
      )
  }
}
