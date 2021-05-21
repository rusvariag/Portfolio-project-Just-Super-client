import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  totalProducts: number;
  totalOrders: number;
  openCartDate: Date;
  lastPurchase: Date;

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.commonService.getCommon().subscribe(
      res => {
        this.totalOrders = res.orders;
        this.totalProducts = res.products;
        if (res.user) {
          if (res.user.cart) {
            this.openCartDate = res.user.cart.created_at;
          }
          if (res.user.order) {
            this.lastPurchase = res.user.order.created_at;
          }
          this.authService.setUser(res.user);
          this.route.navigate(['/auth/landing/continue']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
