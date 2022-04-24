const table = require('../models/table.model');

class tableController {
    static create = async (req, res, next) => {
        try {
            const data = await table.create(req.body);
            res.status(200).json({
                status: true,
                message: 'table created successfully',
                data
            })
        }
        catch (e) {
            next(e)
        }
    }

    static find = async (req, res) => {
        try {
            const data = await table.find(req.params)
            res.status(200).json({
                status: true,
                message: "Getting table successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static search = async (req, res) => {
        try {
            const data = await table.search(req.params)
            res.status(200).json({
                status: true,
                message: "Getting table successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static delete = async (req, res, next) => {
        try {
            const data = await table.delete(req.params)
            res.status(200).json({
                status: true,
                message: "Getting table successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static update = async (req, res) => {
        try {
            const data = await table.update(req.body, req.params)
            res.status(200).json({
                status: true,
                message: "Getting table successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static all = async (req, res, next) => {
        try {
            const tables = await table.all();
            res.status(200).json({
                status: true,
                message: 'All tables',
                data: tables
            })
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = tableController;