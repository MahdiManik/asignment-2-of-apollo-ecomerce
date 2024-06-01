import { Request } from 'express';
import { ProductModel } from '../products/product.model';
import { TOrders } from './order.interface';
import { OrderModel } from './order.model';
import { orderEmailValidation } from './order.validation.schema';

// check the inventory
const checkInventoryIntoDB = async (
  id: string,
): Promise<{ quantity: number; inStock: boolean } | null> => {
  const result = await ProductModel.findById({ _id: id }).select({
    inventory: 1,
  });
  if (!result) {
    return null;
  } else {
    return result.inventory;
  }
};

// update the quantity of inventory
const updateInventoryQuantity = async (id: string, quantity: number) => {
  const updateQuantity =
    quantity === 0
      ? { $set: { 'inventory.quantity': quantity, 'inventory.inStock': false } }
      : { $set: { 'inventory.quantity': quantity } };
  const result = await ProductModel.findByIdAndUpdate(
    { _id: id },
    updateQuantity,
    {
      new: true,
    },
  );
  return result;
};

// create a order
const createOrderIntoDB = async (orderData: TOrders) => {
  const result = await OrderModel.create(orderData);
  return result;
};

// showed all orders and single order with email also
const getAllOrdersFromDB = async (request: Request) => {
  try {
    const { email } = request.query;

    // Check if email query parameter exists
    if (email) {
      // Validate email
      const validatedEmail = orderEmailValidation.parse(email);

      // Fetch orders for the validated email
      const result = await OrderModel.find({ email: validatedEmail });

      // Check if any orders were found
      if (result.length > 0) {
        return {
          success: true,
          message: 'Orders fetched successfully for user email!',
          data: result,
        };
      }

      // No orders found for the email
      return {
        success: false,
        message: 'No orders found for the provided email.',
      };
    }

    // Check if there are no query parameters
    if (Object.keys(request.query).length === 0) {
      // Fetch all orders
      const result = await OrderModel.find();

      // Check if any orders were found
      if (result.length > 0) {
        return {
          success: true,
          message: 'Orders fetched successfully!',
          data: result,
        };
      }

      // No orders found
      return {
        success: false,
        message: 'No orders found.',
      };
    }

    // Incorrect query parameters provided
    return {
      success: false,
      message: 'Incorrect query parameter.',
    };
  } catch (error: any) {
    // Handle any errors
    return {
      success: false,
      message: error.message || 'An error occurred while fetching orders.',
    };
  }
};

export const orderServices = {
  checkInventoryIntoDB,
  updateInventoryQuantity,
  createOrderIntoDB,
  getAllOrdersFromDB,
};
