import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model'
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import{ UserProfile } from '../../shared/models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user = {} as User;
  constructor(private auth: AuthService,  private route: Router) {

  }

  ngOnInit(): void {
    this.getLoginStatus();
  }

  signInUser(form){
      if(form.valid){
      this.auth.SignIn(this.user).then(
        res => {
          res.user ? this.route.navigate(['/home']) : '';
        }
      ).catch(e => {
        console.log(e);
      })
    }
  }

  getLoginStatus()
  {
    this.auth.checkLogin().then((res: UserProfile)  =>{
      res.uid ? this.route.navigate(['/home']) : '';
    }).catch(message => {
      message === 'not signed in' ?  this.route.navigate(['/sign-in']) : '';
    })
  }

}
