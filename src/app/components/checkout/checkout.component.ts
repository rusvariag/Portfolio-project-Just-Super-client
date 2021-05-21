import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { User } from 'src/app/models/user';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  faCalendarAlt = faCalendarAlt;
  model: NgbDateStruct;
  orderForm: FormGroup;
  cartId: string;
  productsList = [];
  cityList = [];
  user: User;
  totalOrder = 0;
  isCrowded = false;

  constructor(
    private builder: FormBuilder,
    private cartServices: CartService,
    private orderServices: OrderService,
    private userServices: AuthService,
    private commonServices: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.cityList = this.commonServices.getCities();

    this.initForm();

    this.cartServices.getCart().subscribe((cart: any) => {
      this.productsList = cart.products.map(product => ({ ...product, marked: false }));
      this.cartId = cart.id;
      this.totalOrder = cart.products.reduce((acc, cur) => acc + cur.cost, 0);
    });

    this.userServices.getUser().subscribe((user: any) => {
      this.user = user;
    });

  }

  private initForm(): void {
    this.orderForm = this.builder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      shippingDate: ['', Validators.required],
      creditCard: ['', Validators.required],
      totalCost: '',
      customerId: '',
      basketId: '',
    });
  }

  submitOrder(): void {
    this.orderForm.patchValue({
      totalCost: this.totalOrder,
      basketId: this.cartId,
      customerId: this.user._id,
    });
    this.orderServices.createOrder(this.orderForm.value).subscribe(
      res => {
        this.orderServices.setOrder(res);
        this.router.navigate(['/bill']);
      },
      err => {
        console.log(err);
      }
    );
  }

  populateCity(): void {
    this.orderForm.patchValue({
      city: this.user.city,
    });
  }

  populateStreet(): void {
    this.orderForm.patchValue({
      street: this.user.street,
    });
  }

  searchValue(e): void {
    this.productsList.forEach(product => {
      if (product.name.indexOf(e.target.value) !== -1) {
        product.marked = true;
      } else {
        product.marked = false;
      }
    });
  }

  backToShop(): void {
    this.router.navigate(['/shop/shopping']);
  }

  datePicked(dateFormat) {
    const dateValue = `${dateFormat.year}-${dateFormat.month}-${dateFormat.day}`;
    this.orderServices.validateDate(dateValue).subscribe(res => {
      console.log(res)
      if (res < 4) {
        this.isCrowded = false;
      } else {
        this.isCrowded = true;
      }
      this.orderForm.patchValue({
        shippingDate: new Date(dateFormat.year, dateFormat.month, dateFormat.day),
      });
    });
  }

}
