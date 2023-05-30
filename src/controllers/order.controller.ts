import { Request, Response } from 'express';
import orderService from '../services/order.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function listOrders(req:Request, res:Response):Promise<Response> {
  const products = await orderService.listOrders();      
  return res.status(200).json(products);
}

async function createOrder(req:Request, res:Response):Promise<Response> {
  const { userId, productIds } = req.body;  
  const { status, data } = await orderService.createOrder(userId, productIds);
  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);
  }   
  return res.status(201).json(data);
}
export default {
  listOrders,
  createOrder,
};