import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contacts = [
    {
      id: 'dafhsdhshdh',
      username: 'Kelly',
      profile_url: 'https://source.unsplash.com/random/200x200?sig=1',
      dateAdded: new Date()
    },
    {
      id: 'dafhsdhshdh',
      username: 'John',
      profile_url: 'https://source.unsplash.com/random/200x200?sig=2',
      dateAdded: new Date()
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
