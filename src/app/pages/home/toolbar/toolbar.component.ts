import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() drawer;
  constructor() { }

  ngOnInit(): void {
  }

  toggleDrawer(){
    this.drawer.toggle()
  }

}
