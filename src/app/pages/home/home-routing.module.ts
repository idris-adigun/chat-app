import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { WelcomeComponent } from './welcome/welcome.component';
const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'inbox',
        loadChildren: () => import('./inbox/inbox.module').then(module => module.InboxModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(module => module.ContactModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
