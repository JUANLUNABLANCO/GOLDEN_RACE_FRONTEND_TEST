import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 1 })), // Estado inicial (elemento oculto)
      transition('void <=> *', animate(500)), // Transición de 0 a 1 o de 1 a 0 (500 ms)
    ]),
  ],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  showSuccessMessage = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
  ) {
    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
    this.authService.logout();
  }

  login() {
    // without backend we will simulate the correct login with these credentials. It´s indiferent what you put in the form but you have to put both
    const responseLogin = this.authService.login('test@gmail.com', 'test123');
    console.log('## respuesta al login: ', responseLogin);
    if (!responseLogin)  {
      this.showSuccessMessage = false;
    } else {
      this.showSuccessMessage = true;
      this.successMessage = 'Now you can navigate free';
      setTimeout(()=> this.resetForm(), 3000);
    }
    console.log(responseLogin);
  }

  ngOnInit() {
    this.resetForm();
  }
  // # getters
  get emailField() {
    return this.formLogin.get('email');
  }
  get passwordField() {
    return this.formLogin.get('password');
  }

  onSubmit(form: FormGroup) {
    console.log('## form valid: ', form.valid );
    if(form.invalid) {
      return;
    }
    this.login();
  }
  resetForm() {
    this.showSuccessMessage = false;
    // this.successMessage = '';
    this.formLogin.reset();
  }
  isFormLoginValid(){
    if (this.formLogin.valid) return true;
    return false;
  }
}

