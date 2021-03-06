import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection,  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User, UserProfile } from '../../shared/models/user.model';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfileCollection: AngularFirestoreCollection<UserProfile>
  userProfiles: Observable<UserProfile[]>;
  profiles: Observable<UserProfile[]>;
  downloadURL: Observable<string>;
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
  createProfile({email, username},  uid){
    let userProfile = {} as UserProfile;
    userProfile.email = email;
    userProfile.username = username;
    userProfile.status = false;
    userProfile.uid = uid;
    userProfile.profileImageUrl;
    userProfile.contacts = []
    this.userProfileCollection = this.afs.collection('UserProfile');
    return new Promise<any>((resolve, reject) => {
        this.userProfileCollection.doc(uid).set(userProfile).then(res =>{
          resolve(res)
        },
        error => {
          reject(error)
        })
    })
  }

  //Login 
  login(user: User){
    return new Promise<any>((resolve, reject) =>{
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

// Get user Profile by user ID
  getUserProfile(uid){
    this.userProfileCollection = this.afs.collection<UserProfile>('UserProfile', ref => {
      return ref.where('uid', '==', uid);
    });
    this.profiles = this.userProfileCollection.snapshotChanges().pipe(
      map(actions => actions.map(res => {
        const data = res.payload.doc.data() as UserProfile;
        return data;
      }))
    )
    return this.profiles;
  }


  // Update user's profile url
  updateProfileUrl(uid, newProfileUrl){
    return this.afs.collection<UserProfile>('UserProfile').doc(uid).update({
      profileImageUrl : newProfileUrl
    })
  }


  
  checkLogin(){
      return new Promise((resolve, reject) => {
        this.auth.onAuthStateChanged(user => {
           user ? resolve(user) : reject('not signed in')
        });
     });
  }

  
  SignIn(value){
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => {
        reject(err);
      }
      )
    })
  }
  

  logout(){
   return this.auth.signOut()
  }
}
