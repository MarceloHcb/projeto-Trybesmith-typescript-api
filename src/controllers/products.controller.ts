import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function listProducts(req:Request, res:Response):Promise<Response> {
  try {
    const { status, data } = await productsService.listProducts();
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }    
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno' });
  }
}

async function registerProduct(req:Request, res:Response): Promise<Response> {
  try {
    const { status, data } = await productsService.registerProduct(req.body);
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }    
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno' });
  }
}

export default {
  listProducts,
  registerProduct,
};