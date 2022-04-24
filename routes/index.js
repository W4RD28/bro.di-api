const express = require('express');
const router = express.Router();
const createError = require('http-errors')

const user = require('./user');
const admin = require('./admin')
const resto = require('./restaurant')
const table = require('./table')
const order = require('./order')

router.get('/', (req, res) => {
    res.send('Monki flip');
});

router.use('/user', user);

router.use('/admin', admin)

router.use('/restaurant', resto);

router.use('/table', table)

router.use('/order', order)

router.use( async (req, res, next) => {
    next(createError.NotFound('Route not Found'))
})


router.use( (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message
    })
})


module.exports = router;