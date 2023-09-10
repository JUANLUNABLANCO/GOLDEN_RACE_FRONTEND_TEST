import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { CustomValidators } from '../../shared/utilities/custom.validators';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['register']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['userExist']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    expect(component.formRegister.get('name').value).toBe(null);
    expect(component.formRegister.get('email').value).toBe(null);
    expect(component.formRegister.get('password').value).toBe(null);
    expect(component.formRegister.get('confirmPassword').value).toBe(null);
  });

  it('should have name, email, password, and confirmPassword fields as invalid initially', () => {
    component.ngOnInit();
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
  
  // it('should navigate to /login on successful registration', fakeAsync(() => {
  //   component.formRegister.patchValue({
  //     name: 'Test User',
  //     email: 'test100@gmail.com',
  //     password: 'test12345678',
  //     confirmPassword: 'test12345678',
  //   });

  //   authService.register.and.returnValue(of({})); // register ok

  //   component.onSubmit(component.formRegister);

  //   tick();

  //   expect(router.navigate).toHaveBeenCalledWith(['/login']);
  // }));

  // it('should not navigate on invalid form submission', () => {
  //   component.onSubmit(component.formRegister);

  //   // expect(router.navigate).not.toHaveBeenCalled();
  //   expect(router.navigate).toHaveBeenCalledWith(['/register']);
  // });

  // it('should validate password and confirmPassword fields with CustomValidators.passwordsMatch', () => {
  //   component.ngOnInit();

  //   component.formRegister.get('password').setValue('password');
  //   component.formRegister.get('confirmPassword').setValue('password');

  //   const validationResult = CustomValidators.passwordsMatch(component.formRegister);

  //   expect(validationResult).toBe(null);
  // });

  // it('should call userExist and return validation error for existing email', fakeAsync(() => {
  //   component.formRegister.get('email').setValue('test@gmail.com');
  //   userService.userExist.and.returnValue(of(true));

  //   const validationObservable: Observable<any> = component.userExist(
  //     new FormControl('test@gmail.com')
  //   );

  //   let validationError: any = null;
  //   validationObservable.subscribe((errors) => (validationError = errors));

  //   tick();

  //   expect(validationError).toEqual({ emailIsUsed: true });
  // }));

  // it('should call userExist and return null for non-existing email', fakeAsync(() => {
  //   component.formRegister.get('email').setValue('newuser@gmail.com');
  //   userService.userExist.and.returnValue(of(false));

  //   const validationObservable: Observable<any> = component.userExist(
  //     new FormControl('newuser@gmail.com')
  //   );

  //   let validationError: any = null;
  //   validationObservable.subscribe((errors) => (validationError = errors));

  //   tick();

  //   expect(validationError).toBe(null);
  // }));
});

