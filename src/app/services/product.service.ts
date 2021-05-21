import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { Product } from 'src/app/models/product';
import { productUrl, productSearchUrl } from 'src/app/config/api';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = new BehaviorSubject([]);
  product = new Subject;

  constructor(
    private http: HttpClient,
    private categoryServices: CategoryService
  ) { }

  getProducts() {
    return this.products.asObservable();
  }

  setProducts(products) {
    this.products.next(products);
  }

  getProduct() {
    return this.product.asObservable();
  }

  setProduct(product) {
    this.product.next(product);
  }

  insertInnerProductArray(product) {
    const productList = this.products.value;
    productList.push(product);
    this.setProducts(productList);
  }

  updateInnerProductArray(product) {
    const productList = this.products.value;
    const category = this.categoryServices.revealCategory();
    const newProductList = productList.map(obj => {
      if (obj._id === product._id) {
        if (category._id === product.category_id) {
          return product;
        }
        return undefined;
      }
      return obj;
    });
    this.setProducts(newProductList.filter(i => i));
  }

  fetchProducts({ _id, name }): Observable<Product[]> {
    return this.http.get<Product[]>(`${productUrl}/${_id}`);
  }

  searcProducts(searchValue): Observable<Product[]> {
    return this.http.post<Product[]>(productSearchUrl, searchValue);
  }

  createProduct(data: any): Observable<Product> {
    return this.http.post<Product>(productUrl, data);
  }

  updateProduct(productId, data: any): Observable<Product> {
    return this.http.patch<Product>(`${productUrl}/${productId}`, data);
  }

}
