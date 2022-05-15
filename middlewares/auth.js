const jwt = require('../utils/jwt')
const createError = require('http-errors')

var token;

const auth = async (req, res, next) => {
    if (!req.headers.authorization || !req.cookies.jwt) {
        return next(createError.Unauthorized('Access token is required'))
    }

    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(createError.Unauthorized())
    }

    
    await jwt.verifyAccessToken(token).then(user => {
        req.user = user
        next()
    }).catch (e => {
        next(createError.Unauthorized(e.message))
    })
}
module.exports = auth;