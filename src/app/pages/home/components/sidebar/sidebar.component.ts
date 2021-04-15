import { Component, OnInit, Input } from '@angular/core';
import{UserProfile } from '../../../../shared/models/user.model';

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
