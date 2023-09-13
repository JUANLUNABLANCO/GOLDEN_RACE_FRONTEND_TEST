// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { AuthenticationService } from './authentication.service';

// describe('AuthenticationService', () => {
//   describe('AuthService', ()=>{
//     let authService: AuthenticationService;
//     let httpController: HttpTestingController;
  
//     beforeEach(() => {
//       TestBed.configureTestingModule({
//         imports: [ HttpClientTestingModule ],
//         providers: [
//           AuthenticationService
//         ]
//       });
//       authService = TestBed.inject(AuthenticationService);
//       httpController = TestBed.inject(HttpTestingController);
//     });
//     afterEach(()=>{
//       httpController.verify();
//     });

//     it('authService should be created', () => {
//       expect(authService).toBeTruthy();
//     });

//   });
// });

import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  // Test for login
  it('should return true and set auth in localStorage when valid email and password are provided', () => {
    const email = 'test@gmail.com';
    const password = 'test123';

    const result = service.login(email, password);

    expect(result).toBeTrue();
    expect(localStorage.getItem('auth')).toBe('ok');
  });

  it('should return false when email is missing', () => {
    const password = 'test123';

    const result = service.login(null, password);

    expect(result).toBeFalse();
  });

  it('should return false when password is missing', () => {
    const email = 'test@gmail.com';

    const result = service.login(email, null);

    expect(result).toBeFalse();
  });

  // Test for logout
  it('should remove auth from localStorage and return false when logout is called', () => {
    localStorage.setItem('auth', 'ok');

    const result = service.logout();

    expect(result).toBeFalse();
    expect(localStorage.getItem('auth')).toBeNull();
  });

  // Test for isAuthenticated
  it('should return true when auth is present in localStorage', () => {
    localStorage.setItem('auth', 'ok');

    const result = service.isAuthenticated();

    expect(result).toBeTrue();
  });

  it('should return false when auth is missing from localStorage', () => {
    localStorage.removeItem('auth');

    const result = service.isAuthenticated();

    expect(result).toBeFalse();
  });
});
