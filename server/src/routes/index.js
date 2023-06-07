const Router = require('koa-router');

const houseRoutes = require('./house');

const router = new Router({ prefix: '/api' });

router.use(houseRoutes);

module.exports = router.routes();