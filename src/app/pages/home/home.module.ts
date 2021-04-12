import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { HomeComponent } from './home.component';
import { MatModule } from '../../module/mat/mat.module';
import { ToolbarComponent } from './toolbar/toolbar.component'

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatModule
  ]
})
export class HomeModule { }
