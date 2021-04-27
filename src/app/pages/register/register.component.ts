import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model'
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {} as User
  constructor(private auth: AuthService, private route: Router) {

  }

  ngOnInit(): void {
  }

  // Register Use
  
  registerUser(form){
    if(form.valid){
      this.auth.Register(this.user).then(
        res => {
          // Create user profile is registered
          if(res.user){
            this.auth.createProfile(this.user, res.user.uid).then(
              res => {
                console.log('Profile created');
                this.route.navigate(['/']);
            })
            .catch(e => {
              console.log(e)
            })
          }
        }
      ).catch(e => {
        console.log(e);
      })
    }
  }
}
