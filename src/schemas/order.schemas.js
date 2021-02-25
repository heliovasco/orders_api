const Joi = require('joi');

const schemas = {
  orderGET: Joi.object().keys({
    id: Joi.number().min(1).required()
  }),
orderDELETE: Joi.object().keys({
    id: Joi.number().min(1).required()
  }),
  orderCreatePOST: Joi.object().keys({
    reference_number: Joi.string().required(),
    client_id: Joi.number().required(),
    date: Joi.date().required(),
    address: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array().items(Joi.object().keys({ 
        qty: Joi.number().required(),
        price: Joi.number().required()
    })),
  }),
  orderItemAddPOST: Joi.object().keys({
    order_id: Joi.number().min(1).required(),
    qty: Joi.number().min(1).required(),
    price: Joi.number().min(0).required()
  }),
  orderUpdatePOST: Joi.object().keys({
    id: Joi.number().required(),
    reference_number: Joi.string(),
    client_id: Joi.number(),
    date: Joi.date(),
    address: Joi.string(),
    total: Joi.number()
  }),
};

module.exports = schemas;