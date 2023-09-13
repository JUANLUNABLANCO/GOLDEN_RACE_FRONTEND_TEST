import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/auth/authentication.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [AuthenticationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  // Component tests

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with null values', () => {
    expect(component.formLogin.get('email')?.value).toBeNull();
    expect(component.formLogin.get('password')?.value).toBeNull();
  });

  it('should set showSuccessMessage to false initially', () => {
    expect(component.showSuccessMessage).toBeFalse();
  });

  it('should reset the form and hide success message', () => {
    component.showSuccessMessage = true;
    component.resetForm();
    expect(component.showSuccessMessage).toBeFalse();
    expect(component.formLogin.get('email')?.value).toBeNull();
    expect(component.formLogin.get('password')?.value).toBeNull();
  });

  it('should return true when the form is valid', () => {
    component.formLogin.setValue({ email: 'test@gmail.com', password: 'test123' });
    expect(component.isFormLoginValid()).toBeTrue();
  });

  it('should return false when the form is invalid', () => {
    component.formLogin.setValue({ email: 'test@gmail.com', password: '' });
    expect(component.isFormLoginValid()).toBeFalse();
  });

  it('should call login and show success message on successful login', fakeAsync(() => {
    spyOn(authService, 'login').and.returnValue(true);
    const resetFormSpy = spyOn(component, 'resetForm');
    component.formLogin.setValue({ email: 'test@gmail.com', password: 'test123' });

    component.login();

    // Advance time by 3000 ms (3 seconds) using tick
    tick(3000);

    expect(authService.login).toHaveBeenCalledWith('test@gmail.com', 'test123');
    expect(component.showSuccessMessage).toBeTrue();
    expect(component.successMessage).toEqual('Now you can navigate free');
    expect(resetFormSpy).toHaveBeenCalled();
  }));

  it('should call login and not show success message on unsuccessful login', () => {
    spyOn(authService, 'login').and.returnValue(false);
    const resetFormSpy = spyOn(component, 'resetForm');
    component.formLogin.setValue({ email: 'test@gmail.com', password: 'test123' });

    component.login();

    expect(authService.login).toHaveBeenCalledWith('test@gmail.com', 'test123');
    expect(component.showSuccessMessage).toBeFalse();
    expect(resetFormSpy).not.toHaveBeenCalled();
  });

  it('should call onSubmit and login when form is valid', () => {
    const loginSpy = spyOn(component, 'login');
    component.formLogin.setValue({ email: 'test@gmail.com', password: 'test123' });

    component.onSubmit(component.formLogin);

    expect(loginSpy).toHaveBeenCalled();
  });

  it('should not call login when form is invalid', () => {
    const loginSpy = spyOn(component, 'login');
    component.formLogin.setValue({ email: 'test@gmail.com', password: '' });

    component.onSubmit(component.formLogin);

    expect(loginSpy).not.toHaveBeenCalled();
  });
});
