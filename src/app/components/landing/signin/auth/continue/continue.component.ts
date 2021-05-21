import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.scss']
})
export class ContinueComponent implements OnInit {

  isCardExist = false;
  userId: string;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: User) => {
      if (user) {
        this.userId = user._id;
        if (user.cart) {
          this.isCardExist = true;
        }
      }
    });
  }

  startShopping() {
    this.cartService.createCart(this.userId).subscribe((cart: Cart) => {
      this.cartService.setCart(cart);
    });
  }

  continueShopping() {
    this.cartService.fetchCart(this.userId).subscribe(cart => {
      this.cartService.setCart(cart);
    });
  }
}
