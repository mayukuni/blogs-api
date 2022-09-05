const sequelize = require("sequelize");
const createBlogPost = (sequelize, DataTypes) => { 
const BlogPost = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true
  },
  published: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated: {
    type: DataTypes.DATE,
    allowNull: false
  }
  }, { timestamps: false });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    })
  }

  return BlogPost;
};

module.exports = createBlogPost;