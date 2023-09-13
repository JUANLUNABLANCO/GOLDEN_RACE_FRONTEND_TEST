import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// this is the old way to implement it before version 15, now it is deprecated. I have in adminGuard the new one.
export class AuthGuard {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }
  
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}