import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from '../../shared/models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  userProfileCollection: AngularFirestoreCollection<UserProfile>
  userProfile: Observable<UserProfile[]>;
  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) { }

  // get contact by username
  // TODO: Filter out if already added in my contact list
  getContact(userName, uid){
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

  sendAddRequest(user, uid){
    this.userProfileCollection = this.afs.collection<UserProfile>('UserProfile');
    return new Promise<any>((resolve, reject) => {
      this.userProfileCollection.doc(uid).collection('Contact').doc(user.uid).set(user).then(
        res => {
          resolve(res)
        },
        error => {
          reject(error)
        }
      )

    })

  }
}
