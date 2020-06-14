import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    // FIXME: Add this later to redirect to home page
    // firebase.auth().onAuthStateChanged(user => {
    //   console.log(user); 
    //   if (user) { // User is signed in
    //     this.router.navigate(['./home']);
    //   } 
    // });
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [ Validators.required ]),
      'password': new FormControl(null, [ Validators.required ])
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);  
  }

  navigateToRegister() {
    this.router.navigate(['./register'])
  }

}