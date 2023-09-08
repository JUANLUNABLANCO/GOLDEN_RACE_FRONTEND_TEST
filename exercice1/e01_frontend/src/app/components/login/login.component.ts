import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLogin: FormGroup;

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
    if(this.formLogin.invalid) {
      return;
    }
    this.authService.login(this.formLogin.value).pipe(
      map(token => this.router.navigate(['/store']))
    ).subscribe();
  }
}

