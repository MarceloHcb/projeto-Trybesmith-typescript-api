import { Product } from '../types/Product';
import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import valid from './validations/schemas';

type RegisterProductResponse = ServiceResponse < Product >;

async function listProducts():Promise< ServiceResponse < ProductSequelizeModel[] >> {
  const products = await ProductModel.findAll();  
  return { status: 'SUCCESSFUL',
    data: products };
}

async function registerProduct(product:Product):Promise<RegisterProductResponse> {
  const { error } = valid.productShemaFields.validate(product);  
  if (error && error?.message?.split(' ')
    .pop()?.toUpperCase() === 'REQUIRED') {
    return { status: 'INVALID_DATA', data: { message: error.message } };
  }
    
  if (error) return { status: 'REQUIRED_FIELD', data: { message: error.message } };
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