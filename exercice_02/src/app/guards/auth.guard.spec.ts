import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AuthenticationService],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation for authenticated users', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const navigateSpy = spyOn(router, 'navigate');

    const canActivate = guard.canActivate();

    expect(canActivate).toBeTrue();
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should block navigation for unauthenticated users and redirect to login', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');

    const canActivate = guard.canActivate();

    expect(canActivate).toBeFalse();
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
