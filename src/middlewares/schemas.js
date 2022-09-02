const Joi = require('joi');
const db = require('../database/models');
// colocar essa função no userService
const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
}).required();

const validateBody = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const { message } = error.details[0];
    return res.status(400).json({ message });
  }
  const user = await db.User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
  next();
};

module.exports = validateBody;