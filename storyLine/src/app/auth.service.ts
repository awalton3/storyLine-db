import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseUrl = 'http://db.cse.nd.edu:4201'

  constructor(private http: HttpClient) {}

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
