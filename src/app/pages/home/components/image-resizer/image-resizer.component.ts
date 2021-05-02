import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image-resizer',
  templateUrl: './image-resizer.component.html',
  styleUrls: ['./image-resizer.component.scss']
})
export class ImageResizerComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  uid: string
  image: any;
  maxCropWidth = 200;
  maxCropHeight = 200;
  downloadURL: Observable<string>;
  profileUrl: string; 
  uploadingStatus = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public dialogRef: MatDialogRef<ImageResizerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private storage: AngularFireStorage, private authSevice: AuthService,  private _snackBar: MatSnackBar) {
      console.log("Opening Image cropper...")
    }

  ngOnInit(): void {
    this.uid  = this.data;
    console.log(this.uid)
    // this.imageLoaded(this.image)
  }
  changeProfileImage(event){
    this.image = event.target.files[0];
    const imageSize = this.image.size;

    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log('Cropping Image')
  }

  // getImageDimension(image){
  //     let fileReader = new FileReader();
  //     fileReader.onload = () =>{
  //         let img = new Image()
  //     }
  // }

  uploadImage(){
    const file = this.croppedImage;  
    console.log(file)
    if(file){
      const filepath = `ProfileImages/${this.uid}`;
      const fileRef = this.storage.ref(filepath);
      this.uploadingStatus = true;
  
      fileRef.putString(file, 'data_url').then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.profileUrl = downloadURL;
          console.log(this.profileUrl)
          this.updateProfileUrl()
        })
      });
    } 
    else{
      // send notification that image is empty
            this.sendNotification("No Image found to upload, please add image", 'failed');
    }
  }

  updateProfileUrl(){
    console.log(this.profileUrl)
      this.authSevice.updateProfileUrl(this.uid, this.profileUrl).then(
        res => {
          console.log(res)
          this.sendNotification("Image uploaded", 'Sucess');
          this.closeDialog();
        }
      )
  }

  closeDialog(){
    this.dialogRef.close();
  }
  sendNotification(text, action){
    this._snackBar.open(text, action, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
