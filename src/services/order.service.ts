import { Sequelize } from 'sequelize';
import { PostOrder } from '../types/Order';
import ProductModel from '../database/models/product.model';
import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import UserModel from '../database/models/user.model';
import valid from './validations/schemas';
import { ServiceResponse } from '../types/ServiceResponse';

async function listOrders(): Promise<OrderSequelizeModel[]> {
  const orders = await OrderModel
    .findAll({
      include: [{
        model: ProductModel,
        as: 'productIds',
        attributes: [] }],
      attributes: ['id', 'userId', [Sequelize
        .fn('JSON_ARRAYAGG', Sequelize
          .col('productIds.id')), 'productIds']],
      group: ['Order.id'],
      raw: true });
  return orders;
}
type RegisterOrderResponse = ServiceResponse < PostOrder >;

async function createOrder(userId: number, productIds: number[]): Promise<RegisterOrderResponse> {
  if (!userId) return { status: 'INVALID_DATA', data: { message: '"userId" is required' } };
  if (!productIds) return { status: 'INVALID_DATA', data: { message: '"productIds" is required' } };
  const { error } = valid.orderSchemaFields.validate({ productIds, userId });   

  if (error) return { status: 'REQUIRED_FIELD', data: { message: error.message } };
  const newOrder = await OrderModel.create({ userId, productIds });  
  const validUser = await UserModel.findOne({ where: { id: userId } });  
  if (!validUser) return { status: 'NOT_FOUND', data: { message: '"userId" not found' } };
  const orderData = {
    userId: newOrder.dataValues.userId,
    productIds,
  };
  const responseService: RegisterOrderResponse = { status: 'SUCCESSFUL',
    data: orderData };
  
  return responseService;
}

export default {
  listOrders,
  createOrder,
};
