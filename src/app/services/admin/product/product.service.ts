import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.endpoint;
  constructor(private http: HttpClient) {}

  createProduct(product: Product) {
    return this.http.post(`${this.url}product`, product);
  }

  getProducts() {
    return this.http.get(`${this.url}product`);
  }

  getProduct(id: string) {
    return this.http.get(`${this.url}product/${id}`);
  }
  updateProduct(id: string, product: Product) {
    return this.http.patch(`${this.url}product/${id}`, product);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.url}product/${id}`);
  }
}
