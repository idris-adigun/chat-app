import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule,
  ],
  exports: [
    MatButtonModule, MatButtonModule,  MatToolbarModule, MatSidenavModule, MatIconModule,  MatButtonModule,
  ]
})
export class MatModule { }
