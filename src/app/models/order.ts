import { User } from './user';
import { Cart } from './cart';

export class Order {
    basket_id: Cart;
    customer_id: User;
    total_cost: number;
    city: string;
    street: string;
    shipment_at: Date;
    credit_card: number;
}
