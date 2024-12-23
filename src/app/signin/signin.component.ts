import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  hidePassword = true;
  logoPath = 'assets/images/sd-hub-logo.jpg';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private UserService: UserService
  ) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signinForm.valid) {
      // Implement your signin logic here
      const { email, password } = this.signinForm.value;
      console.log('Signin form submitted', this.signinForm.value);

      this.UserService.signin({ email, password }).subscribe({
        next: (res) => {
          console.log(res);
          this.openSnackBar(res.message);
        },
        error: (e) => {
          console.log(e);
          this.openSnackBar(e.error.message);
        },
        complete: () => {
          console.log("SignIn Completed");
          this.router.navigate(['/dashboard']);
        }
      });
      // Navigate to dashboard or home page after successful signin
      // this.router.navigate(['/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  forgotPassword(): void {
    // Implement forgot password logic here
    console.log('Forgot password clicked');
    this.snackBar.open('Password reset link sent to your email.', 'Close', { duration: 3000 });
  }

  redirectToRegistration(): void {
    this.router.navigate(['/registration']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(`${message}`, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}