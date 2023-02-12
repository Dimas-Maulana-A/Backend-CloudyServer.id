'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.blog,{
        foreignKey: "id",
        as: "admin_id"
      })

      this.hasMany(models.transaksi,{
        foreignKey: "id",
        as: "transaksi_admin"
      })

      this.belongsTo(models.role, {
        foreignKey: "role_id",
        as: "roles"
      })
    }
  }
  admin.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'admin',
    tableName: 'admin',
  });
  return admin;
};