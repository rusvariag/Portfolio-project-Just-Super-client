import { Cart } from './cart';

export class User {
  _id: string;
  email: string;
  password: string;
  user: any;
  role: string;
  cart: Cart;
  city: string;
  street: string;
}
