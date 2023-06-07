const compose = require('koa-compose');

const cors = require('koa2-cors');
const corsOptions = {
  credentials: true,
  origin: process.env.HOST_URL
};

const koaBody = require('koa-bodyparser');
const response = require('./response');

module.exports = compose([cors(corsOptions), koaBody(), response]);