import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { CustomValidators } from '../../shared/utilities/custom.validators';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { UserService } from '../../services/users/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterComponent', () => {
  // we need
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // spies
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['register']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['userExist']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // the bed of tests asynchonous
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(()=>{
    // the bed of tests not asynchronous
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    // initialize the component
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formRegister.get('name').value).toBe(null);
    expect(component.formRegister.get('email').value).toBe(null);
    expect(component.formRegister.get('password').value).toBe(null);
    expect(component.formRegister.get('confirmPassword').value).toBe(null);
  });

  it('should have name, email, password, and confirmPassword fields as invalid initially', () => {
    expect(component.nameField.invalid).toBeTruthy();
    expect(component.emailField.invalid).toBeTruthy();
    expect(component.passwordField.invalid).toBeTruthy();
    expect(component.confirmPasswordField.invalid).toBeTruthy();
  });

  it('should the form be invalid', () => {
    component.formRegister.patchValue({
      name: 'Nico',
      email: 'this is not an email',
      password: '12121212',
      confirPassword: '12121212',
    });
    expect(component.formRegister.invalid).toBeTruthy();
  });
  
  it('should navigate to /login on successful registration', fakeAsync(() => {
    component.formRegister.patchValue({
      name: 'TestUser',
      // email: 'test100@gmail.com', // email is especial because we have an asynchronous validator userExist()
      password: 'test12345678',
      confirmPassword: 'test12345678',
    });
    // we  get email
    const emailControl = component.formRegister.get('email');
    expect(emailControl).toBeTruthy();
    // the service for userExist 
    userService.userExist.and.returnValue(of(null)); // the value is simulated
    emailControl.setValue('test100000@gmail.com'); // this is a 99.99% probably email avalible
    expect(emailControl.valid).toBeTruthy();

    authService.register.and.returnValue(of({})); // register ok, whe we recibed from Karma a of({})

    component.onSubmit(component.formRegister); // we send the form with the valid values

    tick(); // promise simulation

    expect(router.navigate).toHaveBeenCalledWith(['login']); // in the app after register it redirect to login
  }));

  it('should not navigate on invalid form submission', () => {
    // th value of the formRegister is null because in beforeEach we have component.ngOnInit();
    component.onSubmit(component.formRegister);
    expect(router.navigate).not.toHaveBeenCalled(); // it´s not called the router, so you have to put valid values for redirect
  });

  it('should validate password and confirmPassword fields with CustomValidators.passwordsMatch', () => {
    component.ngOnInit();

    component.formRegister.get('password').setValue('password');
    component.formRegister.get('confirmPassword').setValue('password');

    const validationResult = CustomValidators.passwordsMatch(component.formRegister);

    expect(validationResult).toBe(null);
  });

  it('should call userExist and return validation error for existing email', fakeAsync(() => {
    const emailControl = component.formRegister.get('email');
    expect(emailControl).toBeTruthy();
    // the service for userExist 
    userService.userExist.and.returnValue(of(true)); // the value is simulated
    emailControl.setValue('test@gmail.com'); // this email should have to exists first, register in app with {name: 'teest', email: 'test@gmail.com', password: test12345678}
    expect(emailControl.invalid).toBeTruthy();
  }));
});

