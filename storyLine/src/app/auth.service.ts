import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router, public auth: AngularFireAuth) {}

  isAuth() {
    if (sessionStorage.getItem('username') === null) {
      return false;
    }
    return true;
  }

  getUser() {
    return sessionStorage.getItem('username')
  }

  setUser(username: string, email: string) {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('email', email);
  }

  clearUser() {
    sessionStorage.clear();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }

  // logout() {
  //   firebase.auth().signOut();
  //   sessionStorage.clear();
  // }

  register(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userObj => {
        console.log(userObj); 
        // this.verifyEmail();
      })
      .catch(error => console.log(error)); 

    // console.log(email)
    // return this.http.post(this.baseUrl + "/insertAcct.php", {
    //   username: username,
    //   email: email,
    //   displayName: username,
    //   password: password
    // })
  }

  login(username: string, password: string) {
    // return this.http.post(this.baseUrl + "/selectAcct.php", {
    //   username: username,
    //   plaintextPwd: password
    // })
  }

  updatePassword(username: string, newPassword: string) {
    // return this.http.post(this.baseUrl + "/updateAcctPassword.php", {
    //   username: username,
    //   password: newPassword
    // })
  }

  // register(formData: { email: string; password: string; name: any; type: string; }) {
  //   firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
  //     .then(userObj => {
  //       this.userService.addUserToFbCollect(this.createNewUserObj(userObj, formData))
  //       this.verifyEmail();
  //     })
  //     .catch(error => this.handleError(error.code))
  // }

  // login(formData: { email: string; password: string; }, redirectUrl: string) {
  //   firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
  //     .then(userObj => {
  //       //EMAIL VERIF
  //       // if (userObj.user.emailVerified) {
  //       //   this.userService.createLocalUser(userObj.user.uid)
  //       //   this.userService.user
  //       //     .pipe(first())
  //       //     .subscribe(user => this.router.navigate(['mughub', user.type]));
  //       // } else
  //       //   alert("Please verify your email before logging in.");
  //       this.userService.createLocalUser(userObj.user.uid);
  //       this.userService.user
  //         .pipe(first())
  //         .subscribe(user => {
  //           if (!redirectUrl || (redirectUrl && user.type !== redirectUrl.split('/')[2]))
  //             user.isNewUser ? this.router.navigate(['mughub/welcome']) : this.router.navigate(['mughub', user.type]);
  //           else
  //             this.router.navigateByUrl(redirectUrl);
  //         });
  //     })
  //     .catch(error => this.handleError(error.code))
  // }

  // verifyEmail() {
  //   firebase.auth().currentUser.sendEmailVerification()
  //     .then(() => this.onSuccess("An email verification has been sent."))
  //     .catch(() => this.onError("An error occured when sending the email verification. Please be sure the email is valid."));
  // }

  // resetPassword(email: string) {
  //   firebase.auth().sendPasswordResetEmail(email)
  //     .then(() => this.onSuccess("A password reset email was sent to " + email))
  //     .catch(error => this.handleError(error.code));
  // }

}
