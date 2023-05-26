import { Router } from 'express';
import productsController from '../controllers/products.controller';

const productsRouter = Router();
productsRouter.get('/products', productsController.listProducts);
productsRouter.post('/products', productsController.registerProduct);

export default productsRouter;