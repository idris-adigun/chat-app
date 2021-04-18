import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './home.component';
import { MatModule } from '../../module/mat/mat.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
