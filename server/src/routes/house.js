const Router = require('koa-router');
const router = new Router({ prefix: '/houses' });

const houseCtrl = require('../controllers/house');

router.get('/', houseCtrl.list);
router.get('/:id', houseCtrl.retrieve);
router.post('/', houseCtrl.create);
router.put('/:id', houseCtrl.update);

module.exports = router.routes();