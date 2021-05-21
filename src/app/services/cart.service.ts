import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Cart } from 'src/app/models/cart';
import { cartUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject({ id: '', products: [] });

  constructor(private http: HttpClient) { }

  setCart(cart) {
    this.cart.next(cart);
  }

  getCart() {
    return this.cart.asObservable();
  }

  fetchCart(userId) {
    return this.http.get<Cart>(`${cartUrl}/${userId}`);
  }

  createCart(data: any): Observable<Cart> {
    return this.http.post<Cart>(cartUrl, { id: data });
  }

  updateCart(cartId, data: any) {
    return this.http.patch<Cart>(`${cartUrl}/${cartId}`, data);
  }

  deleteCart(cartId, productId) {
    return this.http.delete<Cart>(`${cartUrl}/${cartId}/${productId}`);
  }
}
