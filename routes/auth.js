const router = require('express').Router();
const user = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

// register
router.post('/user/register', user.register);

// login
router.post('/user/login', user.login);

// all users
router.get('/users/all', auth, user.all);

// get a user
router.get('/user/:id', auth, user.profile);

// delete a user
router.delete('/user/:id', auth, user.delete);

// update a user
router.put('/user/:id/update', auth, user.update);

// update a user profile
router.put('/user/:id/profileupdate', auth, user.updateProfile);

// update a user password
router.put('/user/:id/passwordchange', auth, user.updatePassword);

module.exports = router;