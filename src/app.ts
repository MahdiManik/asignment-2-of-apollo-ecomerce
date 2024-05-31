import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/students/student.route';
import { productRoutes } from './app/modules/products/product.route';
const app: Application = express();

// parser

app.use(express.json());
app.use(cors());

// handle route application
app.use('/api/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json('Connected with database successfully');
});

console.log(process.cwd());

export default app;
