import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../../interfaces/product.interface';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.external_url_api}/products?offset=0&limit=20`);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${environment.external_url_api}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.external_url_api}/products`, product);
  }

  updateProduct(id: number, changes: Partial<Product>) {
    return this.http.put(`${environment.external_url_api}/products/${id}`, changes);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.external_url_api}/products/${id}`);
  }
}

