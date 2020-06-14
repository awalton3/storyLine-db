import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackBarService } from '../shared/snack-bar/snack-bar.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {}
  forgotForm: FormGroup;

  constructor(
    private snackBarService: SnackBarService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = {
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email')
    }
    this.initForm();
  }

  initForm() {
    this.forgotForm = new FormGroup({
      'new': new FormControl(null, [Validators.required]),
      'confirm': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    if (this.forgotForm.value.new !== this.forgotForm.value.confirm)
      this.provideFeedback("Passwords must match", true)
    else {
      this.authService.updatePassword(this.user['username'], this.forgotForm.value.new)
        // .subscribe(res => {
        //   this.provideFeedback("Password Succesfully Updated", false)
        // }, error => console.log(error))
    }
  }

  provideFeedback(message: string, isError: boolean) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: isError })
  }

  navigateToHome() {
    this.router.navigate(['/home'])
  }

  logout() {
    this.authService.logout();
  }

}
