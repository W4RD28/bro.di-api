const admin = require('../services/admin.service');

class adminController {
    static register = async (req, res, next) => {
        try {
            const data = await admin.register(req.body);
            res.status(200).json({
                status: true,
                message: 'Admin created successfully',
                data: data
            })
        }
        catch (e) {
            next(e)
        }
    }


    static login = async (req, res) => {
        try {
            const data = await admin.login(req.body)
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
            const data = await admin.profile(req.params);
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
            const data = await admin.delete(req.params);
            res.status(200).json({
                status: true,
                message: "Retrieving profile successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static update = async (req, res) => {
        try {
            const data = await admin.update(req.body, req.params);
            res.status(200).json({
                status: true,
                message: "Updating admin successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static updateProfile = async (req, res) => {
        try {
            const data = await admin.updateProfile(req.body, req.params);
            res.status(200).json({
                status: true,
                message: "Updating admin profile successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static updatePassword = async (req, res) => {
        try {
            const data = await admin.updatePassword(req.body, req.params);
            res.status(200).json({
                status: true,
                message: "Updating admin password successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }


    static all = async (req, res, next) => {
        try {
            const admins = await admin.all();
            res.status(200).json({
                status: true,
                message: 'All admins',
                data: admins
            })
        }
        catch (e) {
            next(e)
        }
    }
}
module.exports = adminController;