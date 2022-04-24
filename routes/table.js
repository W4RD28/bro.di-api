const router = require('express').Router();
const table = require('../controllers/table.controller');
const auth = require('../middlewares/auth');

// register
router.post('/create', table.create);

// get all tables
router.get('/all', table.all);

// get a table
router.get('/:id', table.find);

// delete a table
router.delete('/:id/delete', table.delete);

// update a table
router.put('/:id/update', table.update);

module.exports = router;