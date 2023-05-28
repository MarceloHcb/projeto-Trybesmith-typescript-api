import { Router } from 'express';
import loginController from '../controllers/login.controller';

const orderRouter = Router();
orderRouter.post('/login', loginController.login);

export default orderRouter;