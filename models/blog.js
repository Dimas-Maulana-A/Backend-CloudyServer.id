'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.category_blog,{
        foreignKey: "category",
        as: "category_blog"
      })

      this.belongsTo(models.admin, {
        foreignKey: "admin",
        as: "admin_blog"
      })
    }
  }
  blog.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.TEXT,
    category: DataTypes.INTEGER,
    admin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'blog',
    tableName: 'blog'
  });
  return blog;
};