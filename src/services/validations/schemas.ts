import Joi from 'joi';

const productShemaFields = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.string().min(3).required(),
  orderId: Joi.number(),
});

const orderSchemaFields = Joi.object({
  productIds: Joi.array().items(Joi.number()).min(1).required()
    .messages({
      'array.min': '"productIds" must include only numbers',
    }),
  userId: Joi.number().strict().integer().required(),
});

export default {
  productShemaFields,
  orderSchemaFields,
};