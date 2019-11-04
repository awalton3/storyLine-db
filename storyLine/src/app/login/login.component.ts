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
      'username': new FormControl(null),
      'password': new FormControl(null, [ Validators.required ])
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    sessionStorage.setItem('username', this.loginForm.value.username);
    this.router.navigate(['./home']);
  }

}
