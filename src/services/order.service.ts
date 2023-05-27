import { Product } from '../types/Product';
import { Order } from '../types/Order';
import ProductModel from '../database/models/product.model';
import OrderModel from '../database/models/order.model';

async function listOrders(): Promise<Order[]> {
  const orders = await OrderModel.findAll({
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
    }],   
  });  
  return orders.map((order) => {  
    const { id, userId, productIds } = order.toJSON();  
    return {
      id,
      userId,
      productIds: (productIds as Product[] | undefined)?.map((product) => product.id),
    };
  });  
}

export default {
  listOrders,
};
