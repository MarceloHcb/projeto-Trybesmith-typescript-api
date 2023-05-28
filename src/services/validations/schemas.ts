import Joi from 'joi';

const productShemaFields = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.string().min(3).required(),
  orderId: Joi.number(),
});

export default productShemaFields;