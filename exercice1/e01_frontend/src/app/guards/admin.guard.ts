import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const userIsAdmin = this.authService.userIsAdmin();

    if (userIsAdmin) {
      return true; // Permite al usuario acceder a la ruta
    } else {
      // Si el usuario no es administrador, redirige a una página de acceso denegado o a otra ruta
      return this.router.createUrlTree(['/access-denied']); // Cambia '/access-denied' a la ruta que desees
    }
  }
}