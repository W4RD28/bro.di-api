const router = require('express').Router();
const user = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

// register
router.post('/register', user.register);

// login
router.post('/login', user.login);

// all users
router.get('/all', auth, user.all);

// get a user
router.get('/:id', auth, user.profile);

// delete a user
router.delete('/:id/delete', auth, user.delete);

// update a user
router.put('/:id/update', auth, user.update);

// update a user profile
router.put('/:id/profileupdate', auth, user.updateProfile);

// update a user password
router.put('/:id/passwordchange', auth, user.updatePassword);

module.exports = router;