const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const House = sequelize.define('houses', {
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

module.exports = House;