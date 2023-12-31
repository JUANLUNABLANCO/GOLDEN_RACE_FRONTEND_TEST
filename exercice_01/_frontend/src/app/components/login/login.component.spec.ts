import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
// import { AuthenticationService } from '../../services/auth/authentication.service';
// import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let authService: jasmine.SpyObj<AuthenticationService>;
  // let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    // const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        HttpClientModule
      ],
      providers: [
        JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        // { provide: AuthenticationService, useValue: authServiceSpy },
        // { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    // router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    expect(component.formLogin.get('email').value).toBe(null);
    expect(component.formLogin.get('password').value).toBe(null);
  });

  it('should have email and password fields as invalid initially', () => {
    component.ngOnInit();
    expect(component.emailField.invalid).toBeTruthy();
    expect(component.passwordField.invalid).toBeTruthy();
  });

});
