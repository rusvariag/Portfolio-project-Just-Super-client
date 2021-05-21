import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { Order } from 'src/app/models/order';
import { orderUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderId = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
  ) { }

  setOrder(order) {
    this.orderId.next(order);
  }

  getOrder() {
    return this.orderId.asObservable();
  }

  createOrder(data: Order): Observable<Order> {
    return this.http.post<Order>(orderUrl, data);
  }

  validateDate(date: any): Observable<any> {
    console.log(new Date(date))
    return this.http.get<any>(`${orderUrl}/dates/${date}`);
  }
}
