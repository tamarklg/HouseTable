const _ = require('lodash');
const Sequelize = require('sequelize');

const config = process.env;

const options = {
  host: config.DB_HOST,
  port: 5432,
  dialect: 'postgres',
  logging: false,
  pool: { max: 5, min: 0, idle: 10000 },
  define: {}
};

const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, options);

module.exports = sequelize;