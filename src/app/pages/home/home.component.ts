import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef,  OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{ UserProfile } from '../../models/user';
import { Router } from '@angular/router';
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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private auth: AuthService, private route: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getLoginStatus()
  }

  
  getLoginStatus()
  {
    this.auth.checkLogin().then((res: UserProfile)  =>{
      this.uid = res.uid;
      console.log(this.uid)
    }).catch(message => {
      message === 'not signed in' ?  this.route.navigate(['/sign-in']) : '';
    })
  }

  //get user profile with uid
  getUserProfile(){
    
  }

}
