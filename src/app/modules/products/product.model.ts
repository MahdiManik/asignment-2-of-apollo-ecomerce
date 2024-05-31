import { TProduct, TInventory, TVariant } from './product.interface';
import { Schema, model } from 'mongoose';

// Define Schemas
const variantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

// Create product Models

export const ProductModel = model<TProduct>('Product', productSchema);
