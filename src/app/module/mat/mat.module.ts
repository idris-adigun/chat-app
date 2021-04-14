import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule,MatFormFieldModule,MatInputModule,MatTabsModule
  ],
  exports: [
    MatButtonModule, MatButtonModule,  MatToolbarModule, MatSidenavModule, MatIconModule,  MatButtonModule,MatFormFieldModule,MatInputModule,MatTabsModule
  ]
})
export class MatModule { }
