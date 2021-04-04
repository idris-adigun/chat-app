import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { HomeComponent } from './home.component';
import { MatModule } from '../../module/mat/mat.module';


@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatModule
  ]
})
export class HomeModule { }
