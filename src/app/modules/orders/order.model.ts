import { Schema, model } from 'mongoose';
import { TOrders } from './order.interface';

export const orderSchema = new Schema<TOrders>({
  email: { type: String, required: true },
  productId: { type: String, required: true, ref: 'products' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const OrderModel = model<TOrders>('Order', orderSchema);
