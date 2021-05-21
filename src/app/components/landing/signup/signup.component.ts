import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Stepper from 'bs-stepper';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from 'src/app/services/common.service';

function passwordsMatchValidator(form) {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');
  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordsMatch: true });
  } else {
    confirmPassword.setErrors(null);
  }
  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  minLengthChar = 8;
  registerForm: FormGroup;
  private stepper: Stepper;
  errorMessage = false;
  cityList = [];

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private commonServices: CommonService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#bs-stepper'), {
      linear: false,
      animation: true
    });

    this.cityList = this.commonServices.getCities();

    this.registerForm = this.builder.group({
      identity: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minLengthChar)]],
      confirmPassword: '',
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
    }, {
      validators: passwordsMatchValidator,
    });
  }

  next(): void { this.stepper.next(); }

  back(): void { this.stepper.previous(); }

  register(): void {
    this.authService.userRegister(this.registerForm.value).subscribe(
      res => {
        this.authService.setUser(res);
        this.router.navigate(['/']);
      },
      err => {
        console.log(err.error.errors);
        this.errorMessage = true;
      }
    );
  }

  nextValidation(): boolean {
    const identityValidation = this.registerForm.get('identity').touched && this.registerForm.get('identity').valid;
    const emailValidation = this.registerForm.get('email').touched && this.registerForm.get('email').valid;
    const passwordValidation = this.registerForm.get('password').touched && this.registerForm.get('password').valid;
    const confirmPasswordValidation = this.registerForm.get('confirmPassword').touched && this.registerForm.get('confirmPassword').valid;
    return !(identityValidation && confirmPasswordValidation && passwordValidation && emailValidation);
  }

  triggerValidation(): void {
    this.registerForm.controls.confirmPassword.markAsTouched({ onlySelf: true });
  }

}
