import { z } from 'zod';

// Define Schemas With Zod
// Variant Validation Schema
const VariantValidationSchema = z.object(
  {
    type: z.string({ message: 'variant type is required' }),
    value: z.string({ message: 'variant value is required' }),
  },
  { required_error: 'variant is required' },
);

// inventory validation schema
const InventoryValidationSchema = z.object(
  {
    quantity: z
      .number({ required_error: 'inventory quantity is required' })
      .min(0, 'quantity must be at least 0'),
    inStock: z.boolean({
      required_error: 'inventory inStock status is required',
    }),
  },
  { required_error: 'inventory is required' },
);

// product validation schema
const ProductValidationSchema = z.object({
  name: z.string({ message: 'product name is required' }),
  description: z.string({ message: 'product description is required' }),
  price: z
    .number({ required_error: 'product price is required' })
    .positive({ message: 'product price must be a positive number' }),
  category: z.string({ message: 'product category is required' }),
  tags: z
    .array(z.string(), { required_error: 'product tags are required' })
    .nonempty({ message: 'product tags must contain at least one tag' }),
  variants: z
    .array(VariantValidationSchema, {
      required_error: 'product variants are required',
    })
    .nonempty({
      message: 'product variants must contain at least one variant',
    }),
  inventory: InventoryValidationSchema.refine((data) => data.quantity >= 0, {
    message: 'inventory quantity must be non-negative',
    path: ['quantity'],
  }),
});

// Export main product validation Schemas
export default ProductValidationSchema;

export const ProductIdValidation = z
  .string({ message: 'Valid product id is required' })
  .length(24, { message: 'Product ID must be 24 characters long' });
