import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  login(email: string | null, password: string | null) {
    if (!email || !password) return false;
    localStorage.setItem('auth', 'ok');
    return true;
  }
  logout() {
    localStorage.removeItem('auth');
    return false;
  }

  isAuthenticated(): boolean {
    if (!localStorage.getItem('auth')) return false;
    return true;
  }
}
