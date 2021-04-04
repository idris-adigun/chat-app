import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages;
  constructor(private location:Location){
  }
 
  ngOnInit():void {
    this.messages = this.location.getState();
    console.log(this.location.getState());

  }
}
