import { Product } from '../types/Product';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

type RegisterProductResponse = ServiceResponse < Product >;
type GetAllProducts = ServiceResponse <unknown>;

async function listProducts():Promise<GetAllProducts> {
  const products = await ProductModel.findAll();  
  const responseService: GetAllProducts = { status: 'SUCCESSFUL',
    data: products }; 
  return responseService;
}

async function registerProduct(product:Product):Promise<RegisterProductResponse> {
  const newProduct = await ProductModel.create(product);  
  const responseService: RegisterProductResponse = { status: 'SUCCESSFUL',
    data: newProduct.dataValues };
  delete responseService.data.orderId; 
  return responseService;
}

export default {
  listProducts,
  registerProduct,
};