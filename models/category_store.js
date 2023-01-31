'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category_store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.product, {
        foreignKey: "id",
        as: "id_category"
      })
    }
  }
  category_store.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category_store',
    tableName: 'category_store',
  });
  return category_store;
};