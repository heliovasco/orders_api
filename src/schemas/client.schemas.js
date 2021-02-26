const Joi = require('joi');

const schemas = {
  clientPOST: Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
  }),
  clientPATCH: Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string(),
    surname: Joi.string(),
    email: Joi.string(),
    phone: Joi.string()
  }),
  clientGET: Joi.object().keys({
    id: Joi.number().min(1).required()
  }),
  clientDELETE: Joi.object().keys({
    id: Joi.number().min(1).required()
  })
};

module.exports = schemas;