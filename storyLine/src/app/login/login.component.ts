import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router) { }

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
    this.router.navigate(['./home'])
  }

}
