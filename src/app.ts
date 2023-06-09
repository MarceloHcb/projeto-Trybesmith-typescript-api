import express, { Request, Response } from 'express';
import productsRouter from './routers/products.router';
import orderRouter from './routers/order.router';
import loginRouter from './routers/login.router';

const app = express();

app.use(express.json());
app.use(orderRouter);
app.use(loginRouter);
app.use(productsRouter);
app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Aplicação está funcionando!');
});
export default app;
