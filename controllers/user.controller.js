const user = require('../services/user.service');
const createError = require('http-errors');


class userController {
    static register = async (req, res, next) => {
        try {
            const data = await user.register(req.body);
            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: data
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }


    static login = async (req, res) => {
        try {
            const data = await user.login(req.body)
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
            const data = await user.profile(req.params);
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
            const data = await user.delete(req.params);
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
            const data = await user.update(req.body, req.params);
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
            const data = await user.updateProfile(req.body, req.params);
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
            const data = await user.updatePassword(req.body, req.params);
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
            const users = await user.all();
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
module.exports = userController;