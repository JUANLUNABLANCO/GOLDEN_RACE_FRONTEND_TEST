import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { CartService } from './services/cart/cart.service';
import { Observable } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './services/products/products.service';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthenticationService } from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })), // Estado inicial (elemento oculto)
      transition('void <=> *', animate(500)), // Transición de 0 a 1 o de 1 a 0 (500 ms)
    ]),
  ],
})
export class AppComponent {
  title = 'e01_frontend';
  total$: Observable<number>;
  entries = [
    {
      name: 'Login',
      link: 'login'
    },
    {
      name: 'Register',
      link: 'register'
    }
  ];

  productForm: FormGroup;
  showSuccessMessage = false;
  successMessage = '';

  constructor (
    private router: Router,
    private cartService: CartService,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private productsService: ProductsService
  ) {
    console.log('### Enviroment Control: ', environment.CONTROL); // only in development to see which environment we are running
    this.total$ = this.cartService.cart$
    .pipe(
      map(products => products.length)
    );

    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      price: ['', [Validators.required, Validators.min(5), Validators.max(20)]],
      description: ['', [Validators.required]]
    });
  }
  // Menu logic
  navigateTo(value: string) {
    this.router.navigate(['../', value]);
  }
  logout(): void{
    this.authService.logout().subscribe((data)=> console.log(data.message));
  }
  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value as Product;

      // console.log('## PRODUCT: ', product);
      this.showSuccessMessage = true;
      this.successMessage = 'Product added successfully.';
      // We are using an external api for that: But the structure of de data it´s a litle diferent
      // {
      //   "title": "New Product",
      //   "price": 10,
      //   "description": "A description",
      //   "categoryId": 1,
      //   "images": ["https://placeimg.com/640/480/any"]
      // }
      // so for that I´ll modify the product before send it
      const productModified = { ...product, categoryId: 1, images: ["https://picsum.photos/640/640?r=7513"]}
      // calling to service to create the product and then
      this.productsService.createProduct(productModified).subscribe((responseCreateProduct) => {
        console.log(responseCreateProduct);
        setTimeout(()=> this.resetForm(), 3000);
      }),
      (err)=> console.error(err);
    }
  }
  onReset() {
    this.resetForm();
  }
  resetForm() {
    this.productForm.reset();
    this.showSuccessMessage = false;
  }
}
