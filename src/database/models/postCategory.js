const sequelize = require("sequelize");
const createPostCategory = (sequelize, DataTypes) => { 
const PostCategory = sequelize.define('PostCategory', {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    foreignKey: true
  }
  }, { timestamps: false });
  
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    })
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    })
  }
  return PostCategory;
};

module.exports = createPostCategory;