import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { MessagesComponent } from './messages/messages.component';
import { MatModule } from '../../../module/mat/mat.module';
import { ScrollableDirective } from '../../../directives/scrollable.directive';


@NgModule({
  declarations: [InboxComponent, MessagesComponent, ScrollableDirective],
  imports: [
    CommonModule,
    InboxRoutingModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InboxModule { }
