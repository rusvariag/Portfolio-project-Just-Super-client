import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: any;
  @Input() cartId: any;

  constructor(
    private cartServices: CartService,
  ) { }

  ngOnInit(): void {
  }

  deleteItem(): void {
    this.cartServices.deleteCart(this.cartId, this.cartItem.id).subscribe(res => {
      console.log(res)
      this.cartServices.setCart(res);
    });
  }

}
