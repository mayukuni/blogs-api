const db = require('../database/models');

const categoriesService = {
  create: async (data) => {
    const newCategory = await db.Category.create(data);
    const onlyDatavalues = newCategory.toJSON();

    return onlyDatavalues;
  },

  getAll: async () => {
    const categories = await db.Category.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return categories;
  },
};

module.exports = categoriesService;