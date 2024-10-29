import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  declarationForm: FormGroup;

  selectedFile: any = null;

  onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0] ?? null;

  }



  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.firstFormGroup = this.formBuilder.group({
      studentId: ['', ],
      applicationDate: ['',],
      firstName: ['', ],
      middleName: [''],
      lastName: ['', ],
      fatherFirstName: ['', ],
      fatherMiddleName: [''],
      fatherLastName: ['', ],
      dateOfBirth: ['',],
      phoneNumber: ['',],
      email: ['',[]],
      address: ['',],
      guardianContact: ['',],
      householdIncome: ['',]
    });

    this.secondFormGroup = this.formBuilder.group({
      courseApplied: ['',],
      degree: ['',],
      collegeName: ['', ],
      yearOfPassing: ['',],
      percentage: ['', ]
    });

    this.declarationForm = this.formBuilder.group({
      declaration: [false, Validators.required],
      studentSignature: ['', Validators.required],
      parentSignature: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.declarationForm.valid) {
      const formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.declarationForm.value
      };
      console.log('Registration form submitted', formData);
      this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
    } else {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
    }
  }

  reset(): void {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
  }
}
