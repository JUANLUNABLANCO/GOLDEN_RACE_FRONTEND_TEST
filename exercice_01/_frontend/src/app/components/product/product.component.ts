import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  AfterViewInit
} from '@angular/core';

import { Product } from './../../interfaces/product.interface';

import { CartService } from './../../services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() product: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  today = new Date();

  // life cycle of a component
  constructor(
    private cartService: CartService
  ) {
    console.log('1. constructor');
  }
  ngOnChanges() {
    console.log('2. ngOnChanges');
  }
  ngOnInit() {
    console.log('3. ngOnInit');
  }
  ngAfterViewInit() {
    console.log('4. ngAfterViewInit');
  }
  ngOnDestroy() {
    console.log('5. ngOnDestroy');
  }

  addCart() {
    console.log('añadir al carrito');
    this.cartService.addCart(this.product);
    // this.productClicked.emit(this.product.id);
  }

}

