import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './home.component';
import { MatModule } from '../../module/mat/mat.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// Image Cropper
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageResizerComponent } from './components/image-resizer/image-resizer.component';
@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    ToolbarComponent,
    WelcomeComponent,
    ImageResizerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    MatSnackBarModule
  ]
})
export class HomeModule { }
