import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseUrl = 'http://3.230.76.98:4201'

  constructor(private http: HttpClient, private router: Router) {}

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


  register(username: string, email: string, password: string) {
    console.log(email)
    return this.http.post(this.baseUrl + "/insertAcct.php", {
      username: username,
      email: email,
      displayName: username,
      password: password
    })
  }

  login(username: string, password: string) {
    return this.http.post(this.baseUrl + "/selectAcct.php", {
      username: username,
      plaintextPwd: password
    })
  }

  updatePassword(username: string, newPassword: string) {
    return this.http.post(this.baseUrl + "/updateAcctPassword.php", {
      username: username,
      password: newPassword
    })
  }

}
