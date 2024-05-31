import { Request, Response } from 'express';
import { productServices } from './product.service';
import ProductValidationSchema, {
  ProductIdValidation,
} from './product.validation.schema';

// product create operation
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    // creating validation using zod
    const zodParsedData = ProductValidationSchema.parse(productData);
    const result = await productServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const issue: Array<string> = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err?.issues?.map((item: any) => issue.push(item.message));
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      issue: issue as Array<string>,
    });
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductFromDB(req);

    res.status(200).json({
      success: true,
      message: result.data.length >= 1 ? result.message : 'no data found',
      data: result.data.length >= 1 ? result.data : null,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
        data: err.message,
      });
    }
  }
};

// get single product by id
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const singleProductData = req.body;

    const { productId } = req.params;

    const validatedData = ProductIdValidation.parse(productId);
    const result = await productServices.getSingleProductFromDB(
      validatedData,
      singleProductData,
    );

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'invalid product id',
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
