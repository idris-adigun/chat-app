import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Select() userProfile$;
  constructor() { 
  }

  ngOnInit(): void {
  }



}
