import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [ Validators.email ]),
      'password': new FormControl(null, [ Validators.required ])
    });
  }

  onSubmit() {
    sessionStorage.setItem('username', this.loginForm.value.email); 
  }

}
