import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import{UserProfile } from '../../../../shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ImageResizerComponent } from '../image-resizer/image-resizer.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // Get userProfile State
  @Select() userProfile$;
  @Input() userProfile: UserProfile;
  uid: string = '';
  profileUrl: string; 
  downloadURL: Observable<string>;
  file;


  constructor(private authSevice: AuthService, private route: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserId();
  }

  openImageCropper(): void {
    this.dialog.open(ImageResizerComponent, {
       width: '900px',
       disableClose: true,
       data: this.uid
     });
   }

  // get user id from state
  getUserId(){
    this.userProfile$.subscribe(res => {
        this.uid = res.userProfile.uid;
    });
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
