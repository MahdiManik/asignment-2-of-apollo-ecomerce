# Apollo assignment 2 by mahdi hasan

The Sample project aims to develop a sample E-commerce Product and order server.

#### To See The My E-commerce Server

# Links

GitHub Repository URL (Server): https://github.com/MahdiManik/asignment-2-of-apollo-ecomerce

Live Server Link: https://asignment-2-of-apollo-ecomerce.vercel.app/

## Project Summary

Objective: Develop an Express application using TypeScript, integrate MongoDB with Mongoose, and ensure data validation with Zod.

## Features

### Product Management:

Create, retrieve, update, delete products.
Search products by term.

### Order Management:

Create and retrieve orders.
Update product inventory on order creation.
Endpoints

### Products:

POST /api/products: Create a product
GET /api/products: Retrieve all products
GET /api/products/:productId: Retrieve a product by ID
PUT /api/products/:productId: Update a product
DELETE /api/products/:productId: Delete a product
GET /api/products?searchTerm=term: Search products

### Orders:

POST /api/orders: Create an order
GET /api/orders: Retrieve all orders
GET /api/orders?email=email: Retrieve orders by email

## Validation

Zod: Used for data validation to ensure data integrity.

1. **Clone the Repository:** Clone the project server repository to your local development environment using the following command:
   ```
   git clone https://github.com/MahdiManik/asignment-2-of-apollo-ecomerce.git
   ```
2. **Run the command:** Open your terminal and run this command:

   ```
   npm i -f
   ```

3. **Set environment variable:** set environment variable in the .env file

```
PORT = 5000

DATABASE_URL = mongodb+srv://mongoos_master:7ErLXMwSlf9YJhQ3@cluster0.rg5wc51.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

4. **Run the project:** For run this project need to run this command

```
npm run start:dev

```

Thanks.
