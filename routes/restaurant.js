const router = require('express').Router();
const restaurant = require('../controllers/restaurant.controller');
const auth = require('../middlewares/auth');

// register
router.post('/create', restaurant.create);

// get all restaurants
router.get('/all', restaurant.all);

// get a restaurant
router.get('/:id', restaurant.find);

// delete a restaurant
router.delete('/:id/delete', restaurant.delete);

// update a restaurant
router.put('/:id/update', restaurant.update);

module.exports = router;