import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
// # reactive forms
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { UserService } from '../../services/users/user.service';
import { Observable, of, from } from 'rxjs';

import { CustomValidators } from '../../shared/utilities/custom.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formRegister = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email], [this.userExist.bind(this)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    }, // validaciones custom
    {
      validators: CustomValidators.passwordsMatch
    });
  }
  // # getters
  get nameField() {
    return this.formRegister.get('name');
  }
  get emailField() {
    return this.formRegister.get('email');
  }
  get passwordField() {
    return this.formRegister.get('password');
  }
  get confirmPasswordField() {
    return this.formRegister.get('confirmPassword');
  }
  onChange($event) {
    // console.log('### KEYUP: ', $event.target.value);
    this.emailField.updateValueAndValidity();
  }
  userExist(control: FormControl): Observable<ValidationErrors | null> {
    // console.log('### email: ', control.value);
    return from(this.userService.userExist(control.value)
      .pipe(map((userExist) => {
        if (userExist) {
          // console.log('email is used: ', true);
          return { emailIsUsed: true };
        } else {
          // console.log('email is used: ', null);
          return null;
        }
    })));
  }

  onSubmit(form: FormGroup) {
    if(this.formRegister.invalid) {
      return;
    }
    this.authService.register(this.formRegister.value).pipe(
      map(user => this.router.navigate(['login']))
    ).subscribe();
  }
}

