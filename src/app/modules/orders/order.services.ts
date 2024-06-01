import { ProductModel } from '../products/product.model';
import { TOrders } from './order.interface';
import { OrderModel } from './order.model';

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

export const orderServices = {
  checkInventoryIntoDB,
  updateInventoryQuantity,
  createOrderIntoDB,
};
