import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
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
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      studentID: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      number: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const {studentID, name, email, password, number} = this.signupForm.value;
      console.log('Signin form submitted', this.signupForm.value);
      this.UserService.signup({studentID, name, email, password, number}).subscribe({
        next: (res) => {
          console.log(res);
          this.openSnackBar(res.message);
        },
        error: (err) => {
          console.log(err.error)
          this.openSnackBar(err.error.message);
        },
        complete: () => {
          console.log("Signup Completed");
          this.router.navigate(['/signin']);
        },
      });
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