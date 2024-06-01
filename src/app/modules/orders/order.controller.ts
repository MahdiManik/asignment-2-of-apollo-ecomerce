import { Request, Response } from 'express';
import { orderServices } from './order.services';
import orderValidationSchema from './order.validation.schema';

// create a order operation
const createAOrder = async (req: Request, res: Response) => {
  try {
    const orderedData = req.body;

    // Validation
    const validatedData = orderValidationSchema.parse(orderedData);
    const { productId, quantity } = validatedData;

    if (quantity === 0) {
      return res.status(400).json({
        success: false,
        message: "You can't create an order with 0 quantity",
      });
    }

    // Check inventory
    const inventory = await orderServices.checkInventoryIntoDB(productId);
    if (!inventory) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Product ID',
      });
    }

    if (!inventory.inStock) {
      return res.status(400).json({
        success: false,
        message: 'Product is out of stock.',
      });
    }

    if (inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    // Create the order
    const orderCreatedResult =
      await orderServices.createOrderIntoDB(validatedData);

    // Update the inventory quantity
    await orderServices.updateInventoryQuantity(
      productId,
      inventory.quantity - quantity,
    );

    return res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: orderCreatedResult,
    });
  } catch (err: any) {
    const issues = err?.issues?.map((item: any) => item.message) || [];

    return res.status(400).json({
      success: false,
      message: 'Your provided data has some issues',
      issues: issues,
    });
  }
};

// all order get and with email request and response
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getAllOrdersFromDB(req);

    if (result && result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
  } catch (err) {
    console.error('Error in getAllOrders handler:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching orders.',
    });
  }
};

// const getAllOrders = async (req: Request, res: Response) => {
//   try {
//     const result = await orderServices.getAllOrdersFromDB(req);
//     if (result.success) {
//       res.status(200).json({
//         ...result,
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         message: 'Order not found',
//       });
//     }
//   } catch (err) {
//     if (err instanceof Error) {
//       res.status(500).json({
//         success: false,
//         message: 'invalid query parameter.',
//       });
//     }
//   }
// };

export const orderController = {
  createAOrder,
  getAllOrders,
};
