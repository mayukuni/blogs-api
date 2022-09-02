// const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService.js');

const userService = {
  create: async (data) => {
    const user = await db.User.findOne({
        where: { email: data.email },
    });
    if (user) return { error: { code: 409, message: { message: 'User already registered' } } };

    await db.User.create(data);

    const { ...userPublicInfo } = data;
    const token = jwtService.createToken({ data: userPublicInfo });
    return token;
},
  getAll: async () => {
    const users = await db.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },

  getById: async (id) => {
    // https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
    // const user = await db.User.findByPk(id, { attributes: { exclude: ['password'] } });
    const user = await db.User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    return user;
  },
};

module.exports = userService;