import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation.schema';

// product create operation
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    // creating validation using zod
    const zodParsedData = productValidationSchema.parse(productData);
    const result = await productServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'product is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      data: err,
    });
  }
};

export const productController = {
  createProduct,
};
