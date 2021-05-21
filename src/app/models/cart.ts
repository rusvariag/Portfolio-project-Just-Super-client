import { Product } from './product';

export class Cart {
    _id: string;
    customer_id: string;
    products: [Product];
}