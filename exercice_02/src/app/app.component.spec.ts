import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/auth/authentication.service';
import { Router } from '@angular/router';


describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(async () => await TestBed.configureTestingModule({
    imports: [
      BrowserAnimationsModule,
      RouterTestingModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule
    ],
    declarations: [AppComponent],
    providers: []
  }).compileComponents());


  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });



  // app test
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'exercice_02'`, () => {
    expect(component.title).toEqual('exercice_02');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span.titlePage')?.textContent).toContain('Exercice 02');
  });

  it('should navigate to /secure when authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    spyOn(router, 'navigate');

    component.onSecureButtonClick();

    expect(router.navigate).toHaveBeenCalledWith(['/secure']);
  });

  it('should show access denied message when not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);

    component.onSecureButtonClick();

    expect(component.showAccessDeniedMessage).toBeTrue();
  });

  it('should reset access denied message after a delay', () => {
    component.showAccessDeniedMessage = true;

    component.resetMessage();

    expect(component.showAccessDeniedMessage).toBeFalse();
  });
});


