import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

// create a product data

const createProductIntoDB = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

export const productServices = {
  createProductIntoDB,
};
