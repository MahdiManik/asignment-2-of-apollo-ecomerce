import { Request } from 'express';
import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

// create a product data

const createProductIntoDB = async (productData: TProduct) => {
  const result = await ProductModel.create(productData);
  return result;
};

// get all products and search product with matching keyword
const getAllProductFromDB = async (req: Request) => {
  const { searchTerm } = req.query;
  const queryObjectLength = Object.keys(req.query).length;

  if (typeof searchTerm === 'string') {
    const keyReg = new RegExp(searchTerm, 'i');

    const result = await ProductModel.find({
      $or: [
        { name: { $regex: keyReg } },
        { description: { $regex: keyReg } },
        { tags: { $regex: keyReg } },
      ],
    });

    return {
      message: `Products matching with search term '${searchTerm}' fetched successfully!`,
      data: result,
    };
  }
  if (queryObjectLength === 0) {
    const result = await ProductModel.find();
    return { message: `Product fetched successfully!`, data: result };
  } else {
    throw new Error('Incorrect query parameter');
  }
};

// get single products
const getSingleProductFromDB = async (id: string, singleProduct: TProduct) => {
  const result = await ProductModel.findById({ _id: id }, singleProduct, {
    new: true,
  });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
};
