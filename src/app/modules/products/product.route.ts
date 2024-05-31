import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

// create route
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getSingleProduct);
router.put('/:productId', productController.updateAProduct);
router.delete('/:productId', productController.deleteAProduct);

export const productRoutes = router;
