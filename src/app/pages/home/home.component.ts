import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef,  OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ContactService } from './../../services/contact/contact.service';
import{ UserProfile } from '../../shared/models/user.model';
import{ Contact } from '../../shared/models/contact.model';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { setUserProfile } from '../../shared/actions/user.actions';
import { addContact } from '../../shared/actions/contact.action'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('drawer') drawer: ElementRef;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  user:any;
  uid: string;
  userProfile = {} as UserProfile;
  contact = {} as Contact;
  contacts: Contact[];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private auth: AuthService, private  contactService : ContactService, private route: Router, private store: Store) {
    //Modify sidebar type on the screen size
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  //check if user is logged in
 checkLoginStatus(){
    this.auth.checkLogin().then((res: UserProfile)  =>{
      this.uid = res.uid;
      this.getUserProfile();
    }).catch(message => {
      message === 'not signed in' ?  this.route.navigate(['/sign-in']) : '';
    })
  }

  //get user profile with uid
  getUserProfile(){
    this.auth.getUserProfile(this.uid).subscribe(res =>{
       this.userProfile = res[0];
       if(this.userProfile){
          this.setUserProfile(this.userProfile)
          this.getUserContact(this.userProfile.uid).then(res => {
            this.addContact(res)
          })
       }
    })
  }

  // Get all the contact info base on user ID
  getUserContact(uid){
    return new Promise<any>((resolve, reject) => {
      this.contactService.getMyContact(uid).subscribe((res) =>{
        res ? resolve(res) : reject('no contact')
      })
    })
    
  }

  // Add user profile to the state
  setUserProfile(userProfile: UserProfile){
    this.store.dispatch(new setUserProfile(userProfile))
  }
  // Add user contact to the state
  addContact(contact: Contact){
    this.store.dispatch(new addContact(contact))
  }

}
