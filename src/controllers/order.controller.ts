import { Request, Response } from 'express';
import orderService from '../services/order.service';

async function listOrders(req:Request, res:Response):Promise<Response> {
  try {
    const products = await orderService.listOrders();      
    return res.status(200).json(products);   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno' });
  } 
}
export default {
  listOrders,
};