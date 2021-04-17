import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from '../../shared/models/user.model';
import { Contact } from '../../shared/models/contact.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  userProfileCollection: AngularFirestoreCollection<UserProfile>
  userProfile: Observable<UserProfile[]>;
  contactCollection: AngularFirestoreCollection<Contact>
  contacts: Observable<Contact[]>;
  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) { }

  // get contact by username
  // TODO: Filter out if already added in my contact list
  searchDirectory(userName, uid){
    this.userProfileCollection = this.afs.collection<UserProfile>('UserProfile', ref => {
      return ref.where('username', '==', userName).where('uid', '!=', uid)
    });
    return this.userProfileCollection.snapshotChanges().pipe(
        map(actions => actions.map(res => {
          const data = res.payload.doc.data() as UserProfile;
          return data
        }))
      )
  }

  addToContact(contact, uid){
    this.userProfileCollection = this.afs.collection<UserProfile>('UserProfile');
    return new Promise<any>((resolve, reject) => {
      this.userProfileCollection.doc(uid).collection('Contact').doc(contact.uid).set(contact).then(
        res => {
          resolve(res)
        },
        error => {
          reject(error)
        }
      )

    })
  }

  getMyContact(uid){
    console.log(uid)
    this.contactCollection = this.afs.collection<UserProfile>('UserProfile').doc(uid).collection('Contact');
    return this.contactCollection.snapshotChanges().pipe(
      map(actions => actions.map(res => {
        const data = res.payload.doc.data();
        return data
      }))
    )
  }
}
