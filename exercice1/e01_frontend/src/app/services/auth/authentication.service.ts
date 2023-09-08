import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LoginForm, RegisterForm } from '../../interfaces/auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from '../../interfaces/user'

export const JWT_NAME = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  login(loginForm: LoginForm) {
    // TODO cors desde el backend y api url en environment
    return this.http.post<any>('/api/users/login', { email: loginForm.email, password: loginForm.password }).pipe(
      map((token) => {
        // TODO servicio genérico para grabado y recuperación de datos de la app en el localStorage
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    )
  }
  register(user: RegisterForm) {
    return this.http.post<any>('api/users/', user).pipe(
      map(user => user)
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserId(): Observable<number> {
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: any) =>  of(this.jwtHelper.decodeToken(jwt)).pipe(
        tap((jwt: any) => console.log('decodedToken ', jwt)),
        map((jwt: any) => jwt.user.id)
      )
      )
    );
  }

  userIsAdmin(): boolean {
    const jwt = localStorage.getItem(JWT_NAME);
    const decodedToken = this.jwtHelper.decodeToken(jwt);
    const role =  decodedToken.user.role;
    console.log('#### ROLE: ', role);
    if (role === UserRole.ADMIN) return true;
    return false;
  }
}
