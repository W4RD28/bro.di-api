const auth = require('../services/auth.service');
const createError = require('http-errors');


class authController {
    static register = async (req, res, next) => {
        try {
            const user = await auth.register(req.body);
            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }


    static login = async (req, res) => {
        try {
            const data = await auth.login(req.body)
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }

    static profile = async (req, res) => {
        try {
            const data = await auth.profile(req.params);
            res.status(200).json({
                status: true,
                message: "Retrieving profile successful",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }

    static delete = async (req, res) => {
        try {
            const data = await auth.delete(req.params);
            res.status(200).json({
                status: true,
                message: "Retrieving profile successful",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }

    static update = async (req, res) => {
        try {
            const data = await auth.update(req.body, req.params);
            res.status(200).json({
                status: true,
                message: "Updating user successful",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }

    static updateProfile = async (req, res) => {
        try {
            const data = await auth.updateProfile(req.body, req.params);
            res.status(200).json({
                status: true,
                message: "Updating user profile successful",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }

    static updatePassword = async (req, res) => {
        try {
            const data = await auth.updatePassword(req.body, req.params);
            res.status(200).json({
                status: true,
                message: "Updating user password successful",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }


    static all = async (req, res, next) => {
        try {
            const users = await auth.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }
}
module.exports = authController;