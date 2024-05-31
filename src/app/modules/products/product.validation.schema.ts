import { z } from 'zod';

// Define Schemas With Zod
const variantValidationSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  value: z.string().min(1, 'Value is required'),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, 'Quantity must be at least 0'),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string().min(1, 'Tag cannot be empty')),
  variants: z
    .array(variantValidationSchema)
    .min(1, 'At least one variant is required'),
  inventory: inventoryValidationSchema,
});

// Export main product validation Schemas
export default productValidationSchema;
