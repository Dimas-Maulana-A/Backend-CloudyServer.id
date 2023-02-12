'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.category_store,{
        foreignKey: "category",
        as: "product_category"
      })

      this.hasMany(models.transaksi, {
        foreignKey: "id",
        as: "products_transaksi"
      })
    }
  }
  product.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'product',
    tableName: 'product',
  });
  return product;
};