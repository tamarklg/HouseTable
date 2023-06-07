'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('houses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
      },
      address: {
        type: Sequelize.STRING
      },
      currentValue: {
        type: Sequelize.FLOAT,
        field: 'current_value'
      },
      loanAmount: {
        type: Sequelize.FLOAT,
        field: 'loan_amount'
      },
      risk: {
        type: Sequelize.FLOAT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('houses');
  }
};