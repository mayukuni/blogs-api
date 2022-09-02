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
    primaryKey: true
  }
  }, { timestamps: false });
  
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Categories',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    })
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    })
  }
  return PostCategory;
};

module.exports = createPostCategory;