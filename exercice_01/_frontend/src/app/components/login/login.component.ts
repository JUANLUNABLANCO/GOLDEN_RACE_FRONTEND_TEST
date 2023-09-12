import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })), // Estado inicial (elemento oculto)
      transition('void <=> *', animate(500)), // Transición de 0 a 1 o de 1 a 0 (500 ms)
    ]),
  ],
})
export class LoginComponent implements OnInit{
  formLogin: FormGroup;

  showErrorMessage = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  // login() {
  //   // esto es solo para probar, sin formulario debe existir en las pruebas de login el mismo usuario
  //   this.authService.login('test@gmail.com', 'test123').subscribe(data => console.log('success', data));
  // }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    });
  }
  // # getters
  get emailField() {
    return this.formLogin.get('email');
  }
  get passwordField() {
    return this.formLogin.get('password');
  }

  onSubmit(form: FormGroup) {
    if(form.invalid) {
      return;
    }
    this.authService.login(this.formLogin.value)
    .subscribe(
      (response)=> {
        if (response.token) {
          const token = response.token; // {access_token: 'dasdsdasdasda...'}
          const userId = response.userId;
          console.log('## TOKEN, USERID: ', token, userId);
          this.router.navigate([`/users/${userId}`]);
        }
      },
      (err)=> {
        console.error('Login fail!, show error message', err);
        this.showErrorMessage = true;
        this.errorMessage = 'Wrong Credentials!';
        setTimeout(()=> this.resetForm(), 3000);
      });
  }

  resetForm() {
    this.formLogin.reset();
    this.showErrorMessage = false;
  }
}

