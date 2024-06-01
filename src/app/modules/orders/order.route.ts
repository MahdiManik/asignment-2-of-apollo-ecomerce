import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

// create route
router.post('/', orderController.createAOrder);
router.get('/', orderController.getAllOrders);

export const orderRoutes = router;
