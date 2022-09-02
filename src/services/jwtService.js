const Joi = require('joi');
require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
    createToken: (data) => {
        const token = jwt.sign({ data }, process.env.JWT_SECRET);
        return token;
    },
// colocar essas funções em um middleware depois
    validateToken: (token) => {
      try {
        if (!token) return { error: { code: 401, message: { message: 'Token not found' } } };
        const data = jwt.verify(token, process.env.JWT_SECRET);
        return data;
      } catch (e) {
        return { error: { code: 401, message: { message: 'Expired or invalid token' } } }; 
      }
    },
// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
// validateBody: (data) => {
//   const schema = Joi.object({
//   displayName: Joi.string().min(8).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
//   image: Joi.string(),
// }).required();
//   const { error, value } = schema.validate(data);

//   if (error) return { error: { code: 400, message: { message: error.details[0].message } } };

//   return value;
// },

    validateCategory: (data) => {
      const schema = Joi.object({
        name: Joi.string().required(),
      });
      const { error, value } = schema.validate(data);
  
      if (error) return { error: { code: 400, message: { message: error.details[0].message } } };
  
      return value;
    },

    validateBody: (data) => {
      const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().required(),
      });
      const { error, value } = schema.validate(data);
  
      if (error) {
        return { error: { code: 400, message: { message: 'Some required fields are missing' } } }; 
      }
  
      return value;
    },
};

module.exports = jwtService;