import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsService } from './services/products/products.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

describe('AppComponent and Product Reactive Form', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => await TestBed.configureTestingModule({
    imports: [
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule,
      MatBadgeModule,
      BrowserAnimationsModule,
      RouterTestingModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule
    ],
    declarations: [AppComponent],
    providers: [
      ProductsService,
      JwtHelperService,
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    ]
  }).compileComponents());

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // app test
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'e01_frontend'`, () => {
    expect(component.title).toEqual('e01_frontend');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span.titlePage')?.textContent).toContain('exercice 01');
  });

  // product reactive forms
  it('should have invalid form when empty', () => {
    expect(component.productForm.valid).toBeFalsy();
  });

  it('should have valid form with valid data', () => {
    const form = component.productForm;
    form.controls['title'].setValue('Product Name');
    form.controls['price'].setValue(15);
    form.controls['description'].setValue('Product description');
    expect(form.valid).toBeTruthy();
  });

  it('should have invalid form with invalid name', () => {
    const form = component.productForm;
    form.controls['title'].setValue('Pro'); // Less than 5 characters
    form.controls['price'].setValue(15);
    expect(form.valid).toBeFalsy();
  });

  it('should have invalid form with invalid price', () => {
    const form = component.productForm;
    form.controls['title'].setValue('Product Name');
    form.controls['price'].setValue(3); // Less than 5
    form.controls['description'].setValue('Product description');
    expect(form.valid).toBeFalsy();
  });

  it('should display error messages for invalid name', () => {
    const compiled = fixture.nativeElement;
    const nameInput = compiled.querySelector('#title');
    nameInput.value = 'Pro'; // Less than 5 characters
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = compiled.querySelector('.error-message');
    expect(errorMessage.textContent).toContain('Name must be at least 5 characters.');
  });

  it('should display error messages for invalid price', () => {
    const compiled = fixture.nativeElement;
    const priceInput = compiled.querySelector('#price');
    priceInput.value = 3; // Less than 5
    priceInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorMessage = compiled.querySelector('.error-message');
    expect(errorMessage.textContent).toContain('Price must be greater than 5.');
  });

  it('should reset the form and hide success message', () => {
    const form = component.productForm;
    form.controls['title'].setValue('Product Name');
    form.controls['price'].setValue(15);
    form.controls['description'].setValue('Product description');
    component.showSuccessMessage = true;

    component.onReset();

    expect(form.get('title').value).toEqual(null);
    expect(form.get('price').value).toEqual(null);
    expect(form.get('description').value).toEqual(null);
    expect(component.showSuccessMessage).toBeFalsy();
  });

  it('should show success message on successful submission', () => {
    const form = component.productForm;
    form.controls['title'].setValue('Product Name');
    form.controls['price'].setValue(15);
    form.controls['description'].setValue('Product description');

    component.onSubmit();

    expect(component.showSuccessMessage).toBeTruthy();
  });

  it('should not show success message on invalid submission', () => {
    const form = component.productForm;
    form.controls['title'].setValue('Pro'); // Invalid name
    form.controls['price'].setValue(3); // Invalid price
    form.controls['description'].setValue(''); // Invalid description
    component.onSubmit();

    expect(component.showSuccessMessage).toBeFalsy();
  });

});


