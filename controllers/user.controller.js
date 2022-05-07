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
            next(e)
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
            next(e)
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
            next(e)
        }
    }

    static delete = async (req, res) => {
        try {
            const data = await user.delete(req.params);
            res.status(200).json({
                status: true,
                message: "Deleting user successful",
                data
            })
        } catch (e) {
            next(e)
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
            next(e)
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
            next(e)
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
            next(e)
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
            next(e)
        }
    }

    
    static generatePasswordReset = async (req, res) => {
        try {
            const data = await user.generatePasswordReset(req.body);
            res.status(200).json({
                status: true,
                message: "succesfully sent email",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static passwordReset = async (req, res) => {
        try {
            const data = await user.passwordReset(req.body, req.params);
            res.status(200).json({
                status: true,
                message: "succesfully reset password",
                data
            })
        } catch (e) {
            next(e)
        }
    }
}
module.exports = userController;