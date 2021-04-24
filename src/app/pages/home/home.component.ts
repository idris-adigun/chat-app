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
import { first } from 'rxjs/operators';

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
  userProfileSub;
  userStatusSub;


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private auth: AuthService, private route: Router, private store: Store) {
    //Modify sidebar type on the screen size
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    // Unsubscribe from services
    this.userStatusSub.unsubscribe()
    this.userProfileSub.unsubscribe()
  }

  //check if user is logged in
 checkLoginStatus(){
    this.userStatusSub = this.auth.checkLogin().then((res: UserProfile)  =>{
      this.uid = res.uid;
      this.getUserProfile();
    }).catch(message => {
      message === 'not signed in' ?  this.route.navigate(['/sign-in']) : '';
    })
  }

  //get user profile with uid
  getUserProfile(){
    this.userProfileSub =  this.auth.getUserProfile(this.uid).pipe(first()).subscribe(res =>{
      console.log(res)
       this.userProfile = res[0];
       if(this.userProfile){
          this.setUserProfile(this.userProfile);
       }
    })
  }

  // Add user profile to the state
  setUserProfile(userProfile: UserProfile){
    this.store.dispatch(new setUserProfile(userProfile))
  }

}
