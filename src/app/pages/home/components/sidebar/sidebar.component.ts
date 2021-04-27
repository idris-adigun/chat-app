import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import{UserProfile } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() userProfile: UserProfile;
  constructor(private authSevice: AuthService, private route: Router) { }

  ngOnInit(): void {
  }


  logout(){
    this.authSevice.logout().then(
      res => {
        console.log(res);
          this.route.navigate(['/sign-in']);
      },
      error => console.log(error)
    );
  }


}
