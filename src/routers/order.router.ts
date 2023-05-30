import { Router } from 'express';
import orderController from '../controllers/order.controller';
import validateJWT from '../middlewares/validateJWT';

const orderRouter = Router();
orderRouter.get('/orders', orderController.listOrders);
orderRouter.post('/orders', validateJWT, orderController.createOrder);

export default orderRouter;