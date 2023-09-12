import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  describe('AuthService', ()=>{
    let authService: AuthenticationService;
    let httpController: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [
          AuthenticationService
        ]
      });
      authService = TestBed.inject(AuthenticationService);
      httpController = TestBed.inject(HttpTestingController);
    });
    afterEach(()=>{
      httpController.verify();
    });

    it('authService should be created', () => {
      expect(authService).toBeTruthy();
    });

  });
});
