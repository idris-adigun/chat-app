import { Component, OnInit, Input } from '@angular/core';
import{UserProfile } from '../../.../../../../models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() userProfile: UserProfile;
  constructor() { }

  ngOnInit(): void {
  }

}
