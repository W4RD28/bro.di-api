const router = require('express').Router();
const admin = require('../controllers/admin.controller');
const auth = require('../middlewares/auth');

// register
router.post('/register', admin.register);

// login
router.post('/login', admin.login);

// all admins
router.get('/all', auth, admin.all);

// get a admin
router.get('/:id', auth, admin.profile);

// delete a admin
router.delete('/:id', auth, admin.delete);

// update a admin
router.put('/:id/update', auth, admin.update);

// update a admin profile
router.put('/:id/profileupdate', auth, admin.updateProfile);

// update a admin password
router.put('/:id/passwordchange', auth, admin.updatePassword);

module.exports = router;