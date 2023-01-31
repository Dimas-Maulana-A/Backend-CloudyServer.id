'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "client",
          key: "id"
        }
      },
      status: {
        type: Sequelize.STRING
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "admin",
          key: "id"
        }
      },
      metode_pembayaran: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('transaksi');
  }
};