const router = require('express').Router();
const order = require('../controllers/order.controller');
const auth = require('../middlewares/auth');

// register
router.post('/create', order.create);

// get all orders
router.get('/all', order.all);

// get an order
router.get('/:id', order.find);

// get orders by userId
router.get('/getbyuser/:idUser', order.findAllByUserId)

// delete an order
router.delete('/:id/delete', order.delete);

// update an order
router.put('/:id/update', order.update);

// update an order status
router.put('/:id/updatestatus', order.updateStatus);

module.exports = router;