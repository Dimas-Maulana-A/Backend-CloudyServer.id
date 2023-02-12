'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.admin, {
        foreignKey: "admin_id",
        as: "admins"
      })

      this.belongsTo(models.client, {
        foreignKey: "client_id",
        as: "clients"
      })

      this.hasMany(models.detail_transaksi, {
        foreignKey: "transaksi_id",
        as: "details"
      })
    }
  }
  transaksi.init({
    client_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    admin_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi',
  });
  return transaksi;
};