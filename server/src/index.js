require('../config/.env');

const Koa = require('koa');
const middlewares = require('./middleware');
const routes = require('./routes');

const app = new Koa();

app.use(middlewares);
app.use(routes);

const port = 4202;
const server = app.listen(port, () => console.log(`Starting :${port} ...`));

module.exports = server;