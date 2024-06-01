import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/products/product.route';
import { orderRoutes } from './app/modules/orders/order.route';
const app: Application = express();

// parser

app.use(express.json());
app.use(cors());

// handle route application
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json('Connected with database successfully');
});

console.log(process.cwd());

export default app;
