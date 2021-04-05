import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User, UserProfile } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfileCollection: AngularFirestoreCollection<UserProfile>
  userProfiles: Observable<UserProfile[]>;
  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) { }

  // Register
  Register(user: User){
    return new Promise<any>((resolve, reject) =>{
      this.auth.createUserWithEmailAndPassword(user.email, user.password).then(
        res=>{
          resolve(res);
          // if user registered, create user Profile
        },
        error =>{
          reject(error);
        }
      )
    })
  }
  
  //create Profile
  createProfile(userProfile: UserProfile){
    this.userProfileCollection = this.afs.collection('UserProfile');
    return new Promise<any>((resolve, reject) => {
        this.userProfileCollection.add(userProfile).then(res =>{
          resolve(res)
        },
        error => {
          reject(error)
        })
    })
  }

  //Login 
  login(user: User){
    return new Promise<any>((resolve, reject) =>
    {
      this.auth.signInWithEmailAndPassword(user.email, user.password).then(
        res =>
        {
          resolve(res);
        },
        error => {
          reject(error)
        }
      )
    });
  }
}
