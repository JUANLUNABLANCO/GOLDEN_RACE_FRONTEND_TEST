import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { CartService } from './services/cart/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
  constructor (
    private router: Router,
    private cartService: CartService
  ) {
    console.log('### Enviroment Control: ', environment.CONTROL); // only in development to see which environment we are running
    this.total$ = this.cartService.cart$
    .pipe(
      map(products => products.length)
    );
  }
 

  // Menu logic
  navigateTo(value: string) {
    this.router.navigate(['../', value]);
  }
}
