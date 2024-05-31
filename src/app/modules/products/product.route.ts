import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

// create route
router.post('/create-product', productController.createProduct);

export const productRoutes = router;
