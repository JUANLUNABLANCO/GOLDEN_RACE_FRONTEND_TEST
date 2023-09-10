import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthenticationService } from '../services/auth/authentication.service';

// This is the new way to implement a guard starting with version 15. In AuthGuard there is the old way for previous versions, both still work.
export const AdminGuard: CanActivateFn = (route, state): boolean => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const userIsAdmin = authService.userIsAdmin();

  if(userIsAdmin) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  } 
}