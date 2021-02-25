const Joi = require('joi'); 
const inputValidation = (schema, property) => { 
  return (req, res, next) => { 
  const { error } = schema.validate(property==='params'?req.params:req.body); 
  const valid = error == null; 

  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
   res.status(422).json({ error: message }) } 
  } 
} 
module.exports = inputValidation;