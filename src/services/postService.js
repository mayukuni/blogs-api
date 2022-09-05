const db = require('../database/models');

const postsService = {
  getAll: async () => {
    const posts = await db.BlogPost.findAll({
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return posts;
  },

  getById: async (id) => {
    const post = await db.BlogPost.findByPk(id, { 
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    // const post = await db.BlogPost.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    return post;
  },
};

module.exports = postsService;