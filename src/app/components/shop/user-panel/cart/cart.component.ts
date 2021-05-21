import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems = [];
  cartTotal = 0;
  isLoaded = false;
  cardId: string;

  constructor(
    private productServices: ProductService,
    private cartServices: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartServices.getCart().subscribe((cart: any) => {
      if (cart.products.length > 0) {
        this.cartItems = cart.products;
        this.isLoaded = true;
        this.calcCartTotal();
      } else {
        this.isLoaded = false;
      }
      this.cardId = cart.id || cart._id;
    });
    this.productServices.getProduct().subscribe((product: any) => {
      let tmpProduct;
      const existProduct: any = this.cartItems.find((item: any) => {
        return product._id === item.productId;
      });
      if (existProduct) {
        tmpProduct = {
          _id: existProduct.productId,
          quantity: existProduct.quantity + product.quantity,
          cost: (existProduct.quantity + product.quantity) * product.price
        };
      } else {
        tmpProduct = { _id: product._id, quantity: product.quantity, cost: product.quantity * product.price };
      }
      this.cartServices.updateCart(this.cardId, tmpProduct).subscribe(res => {
        this.cartServices.setCart(res);
      });
    });
  }

  calcCartTotal(): void{
    this.cartTotal = 0;
    if (this.cartItems) {
      this.cartItems.forEach((item: any) => {
        this.cartTotal = this.cartTotal + item.cost;
      });
    }
  }

  goToOrder(): void {
    this.router.navigate(['/checkout']);
  }

}
