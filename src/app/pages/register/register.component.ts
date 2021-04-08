import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {} as User
  constructor() { }

  ngOnInit(): void {
  }
  register(form){
    if(form.valid){
      console.log(form.value)
    }
  }
}
