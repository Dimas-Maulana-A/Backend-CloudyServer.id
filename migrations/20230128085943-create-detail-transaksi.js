'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_transaksi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transaksi_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "transaksi",
          key: "id"
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "product",
          key: "id"
        }
      },
      total_barang: {
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_transaksi');
  }
};