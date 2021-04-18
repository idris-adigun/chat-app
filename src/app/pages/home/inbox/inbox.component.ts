import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  // Get userProfile State
  @Select() userProfile$;
  userDetails

  conversations = [
    {
      name: 'Kelly',
      profile_url: 'https://source.unsplash.com/random/200x200?sig=1',
      last_message: 'How are you doing?',
      messages: [
        {
          message: 'Hey',
          date_sent: new Date()
        }
      ],
      date_sent: new Date()
    },
    {
      name: 'John',
      profile_url: 'https://source.unsplash.com/random/200x200?sig=2',
      last_message: 'How are you doing?',
      date_sent: new Date()
    },
    {
      name: 'mary',
      profile_url: 'https://source.unsplash.com/random/200x200?sig=3',
      last_message: 'Heyy',
      date_sent: new Date()
    },
    {
      name: 'John',
      profile_url: 'https://source.unsplash.com/random/200x200?sig=4',
      last_message: 'Heyy',
      date_sent: new Date()
    },
    {
      name: 'Grey',
      profile_url: 'https://source.unsplash.com/random/200x200?sig=5',
      last_message: 'Thanks',
      date_sent: new Date()
    }
  ]
  constructor() { 
  }

  ngOnInit(): void {
    this.userProfile$.subscribe(res => this.userDetails = res)
  }

}
