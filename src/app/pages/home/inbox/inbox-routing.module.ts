import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from '../inbox/inbox.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '', 
    component: InboxComponent
  },
  {
      path: 'messages',
      component: MessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
