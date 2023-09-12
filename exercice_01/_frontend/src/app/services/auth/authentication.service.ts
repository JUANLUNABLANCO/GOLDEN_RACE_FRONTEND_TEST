import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { JwtDecoded, LoginForm, LoginResponse, RegisterForm, RegisterResponse, LogoutResponse } from '../../interfaces/auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from '../../interfaces/user.interface'
import { CartService } from '../cart/cart.service';

export const JWT_NAME = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private cartService: CartService
  ) { }

  login(loginForm: LoginForm) {
    // TODO cors desde el backend y api url en environment
    return this.http.post<LoginResponse>('/api/users/login', { email: loginForm.email, password: loginForm.password }).pipe(
      map((token) => {
        // TODO servicio genérico para grabado y recuperación de datos de la app en el localStorage
        localStorage.setItem(JWT_NAME, token.access_token);
        const userId = this.jwtHelper.decodeToken(token.access_token).user.id;
        return { token, userId };
      })
    );
  }
  logout() {
    const jwt = localStorage.getItem(JWT_NAME);
    return this.http.post<LogoutResponse>('/api/users/logout', jwt).pipe(
      tap(()=>{
        localStorage.removeItem(JWT_NAME);
        // reset el cart
        this.cartService.resetCart()
      })
    );
  }
  register(user: RegisterForm) {
    return this.http.post<RegisterResponse>('api/users/', user).pipe(
      map(user => user)
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserId(): Observable<number> {
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: string) =>  of(this.jwtHelper.decodeToken(jwt)).pipe(
        tap((jwt: JwtDecoded) => console.log('### decodedToken ', jwt)),
        map((jwt: JwtDecoded) => jwt.user.id)
      )
      )
    );
  }

  userIsAdmin(): boolean {
    const jwt = localStorage.getItem(JWT_NAME);
    if(jwt) {
      const decodedToken = this.jwtHelper.decodeToken(jwt);
      const role =  decodedToken.user.role;
      console.log('### ROLE: ', role);
      if (role === UserRole.ADMIN) return true;
    }
    console.log('### THERE IS NOT USER AUTHENTICATED JET ###');
    return false;
  }
}
