import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { SnackBarService } from './shared/snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router, private snackBarService: SnackBarService) {}

  register(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userObj => {
        console.log(userObj); 
        this.verifyEmail();
        this.router.navigate(['/login'])
      })
      .catch(error => this.handleError(error)); 
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/home']);
      }).catch(error => { 
        this.handleError(error.code); 
      })
  }

  updatePassword(username: string, newPassword: string) {  //TODO: 

  }

  verifyEmail() {
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => this.onSuccess("An email verification has been sent."))
      .catch(() => this.onError("An error occured when sending the email verification. Please be sure the email is valid."));
  }

  onError(error: string) {
    this.snackBarService.onOpenSnackBar.next({ message: error, isError: true })
  }

  onSuccess(success: string) {
    this.snackBarService.onOpenSnackBar.next({ message: success, isError: false })
  }

  handleError(errorCode: any) {
    switch (errorCode) {
      //login
      case 'auth/invalid-email':
        this.onError('Your email is invalid.')
        break;
      case 'auth/user-disabled':
        this.onError('Your account is disabled.')
        break;
      case 'auth/user-not-found':
        this.onError('Your email is not registered.')
        break;
      case 'auth/wrong-password':
        this.onError('Your password is invalid.')
        break;

      //register
      case 'auth/email-already-in-use':
        this.onError('Email already in use')
        break;
      case 'auth/invalid-email':
        this.onError('Email address is invalid')
        break;
      case 'auth/operation-not-allowed':
        this.onError('Operation not allowed');
        break;
      case 'auth/weak-password':
        this.onError('Password is weak');
        break;

      //reset
      case 'auth/invalid-email':
        this.onError('Email invalid');
        break;
      case 'auth/user-not-found':
        this.onError('No user found');
        break;
    }
  }

  logout() {
    sessionStorage.clear();
    firebase.auth().signOut();
    this.router.navigate(['/login'])
  }

  resetPassword(email: string) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => this.onSuccess("A password reset email was sent to " + email))
      .catch(error => this.handleError(error.code));
  }

}
