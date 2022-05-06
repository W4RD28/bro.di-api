const order = require('../models/order.model');

class orderController {
    static create = async (req, res, next) => {
        try {
            const data = await order.create(req.body);
            res.status(200).json({
                status: true,
                message: 'order created successfully',
                data
            })
        }
        catch (e) {
            next(e)
        }
    }

    static find = async (req, res) => {
        try {
            const data = await order.find(req.params)
            res.status(200).json({
                status: true,
                message: "Getting order successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static search = async (req, res) => {
        try {
            const data = await order.search(req.params)
            res.status(200).json({
                status: true,
                message: "Getting order successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static delete = async (req, res, next) => {
        try {
            const data = await order.delete(req.params)
            res.status(200).json({
                status: true,
                message: "Deleting order successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static update = async (req, res) => {
        try {
            const data = await order.update(req.body, req.params)
            res.status(200).json({
                status: true,
                message: "Updating order successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static updateStatus = async (req, res) => {
        try {
            const data = await order.updateStatus(req.body, req.params)
            res.status(200).json({
                status: true,
                message: "Updating order status successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static all = async (req, res, next) => {
        try {
            const orders = await order.all();
            res.status(200).json({
                status: true,
                message: 'All orders',
                data: orders
            })
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = orderController;