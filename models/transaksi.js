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
        foreignKey: "admin_transaksis",
        as: "admins_id"
      })

      this.belongsTo(models.client, {
        foreignKey: "client_transaksis",
        as: "clients_id"
      })

      this.hasMany(models.detail_transaksi, {
        foreignKey: "id",
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