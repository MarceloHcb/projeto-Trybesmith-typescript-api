import { Request, Response } from 'express';
import orderService from '../services/order.service';

async function listOrders(req:Request, res:Response):Promise<Response> {
  const products = await orderService.listOrders();      
  return res.status(200).json(products);
}
export default {
  listOrders,
};