import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  orderId: string;
  user: any;

  constructor(
    private orderServices: OrderService,
    private userServices: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderServices.getOrder().subscribe((res: any) => {
      this.orderId = res;
    });
    this.userServices.getUser().subscribe(user => {
      this.user = user;
    });
  }

  onFinish(): void {
    delete this.user.cart;
    this.userServices.setUser(this.user);
    this.router.navigate(['/']);
  }
}
