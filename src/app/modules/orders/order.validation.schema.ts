import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string({ message: 'Valid email address is Required.' })
    .email({ message: 'Invalid email address format.' }),
  productId: z
    .string({ message: 'Valid Product id is required.' })
    .length(24, { message: 'Product ID must be exactly 24 characters long.' }),
  price: z
    .number({ required_error: 'Price is required.' })
    .nonnegative({ message: 'Price must be a non-negative number.' }),
  quantity: z
    .number({ required_error: 'Quantity is required.' })
    .int({ message: 'Quantity must be an integer.' })
    .nonnegative({ message: 'Quantity must be a non-negative number.' }),
});

export default orderValidationSchema;
export const orderEmailValidation = z.string().email;
