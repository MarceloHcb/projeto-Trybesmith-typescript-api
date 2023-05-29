import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function listProducts(req:Request, res:Response):Promise<Response> {
  const products = await productsService.listProducts();      
  return res.status(200).json(products.data);
}
async function registerProduct(req:Request, res:Response): Promise<Response> {
  const { status, data } = await productsService.registerProduct(req.body);      
  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);
  }    
  return res.status(201).json(data);
}

export default {
  listProducts,
  registerProduct,
};