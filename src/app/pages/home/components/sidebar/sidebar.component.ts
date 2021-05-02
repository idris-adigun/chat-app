import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import{UserProfile } from '../../../../shared/models/user.model';
import { AngularFireStorage } from "@angular/fire/storage";

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
  constructor(private authSevice: AuthService, private route: Router,private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getUserId();
  }
  changeProfileImage(e){
    const file = e.target.files[0];
    const filepath = `ProfileImages/${this.uid}`;
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, file);
    task.snapshotChanges().pipe(finalize(() =>{
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.pipe(first()).subscribe(url => {
          this.profileUrl = url;
          this.updateProfileUrl();
          console.log(url);
        })
      })).subscribe( uploadProgress => {
        uploadProgress ? console.log(uploadProgress) : '';
      })
  }
  // get user id from state
  getUserId(){
    this.userProfile$.subscribe(res => {
        this.uid = res.userProfile.uid;
    });
  }

  updateProfileUrl(){
    console.log(this.profileUrl)
      this.authSevice.updateProfileUrl(this.uid, this.profileUrl).then(
        res => console.log(res)
      )
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
