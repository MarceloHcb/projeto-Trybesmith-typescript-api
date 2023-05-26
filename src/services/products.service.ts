import { Product } from '../types/Product';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

type RegisterProductResponse = ServiceResponse < Product >;

async function registerProduct(product:Product):Promise<RegisterProductResponse> {
  const newProduct = await ProductModel.create(product);  
  const responseService: RegisterProductResponse = { status: 'SUCCESSFUL',
    data: newProduct.dataValues };
  delete responseService.data.orderId; 
  return responseService;
}

export default {
  registerProduct,
};