'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category_blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.blog, {
        foreignKey: "id",
        as: "id_blogs"
      })
    }
  }
  category_blog.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category_blog',
    tableName: 'category_blog'
  });
  return category_blog;
};