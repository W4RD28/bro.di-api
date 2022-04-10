const router = require('express').Router();
const resto = require('../controllers/restaurant.controller');
const auth = require('../middlewares/auth');

// register
router.post('/create', resto.createRestaurant);

// get all restaurants
router.get('/all', resto.all);

// all users
router.get(`/:id`, resto.findRestaurant);

module.exports = router;