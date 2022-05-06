const restaurant = require('../models/restaurant.model');

class restaurantController {
    static create = async (req, res, next) => {
        try {
            const data = await restaurant.create(req.body);
            res.status(200).json({
                status: true,
                message: 'Restaurant created successfully',
                data
            })
        }
        catch (e) {
            next(e)
        }
    }

    static find = async (req, res) => {
        try {
            const data = await restaurant.find(req.params)
            res.status(200).json({
                status: true,
                message: "Getting restaurant successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static search = async (req, res) => {
        try {
            const data = await restaurant.search(req.params)
            res.status(200).json({
                status: true,
                message: "Getting restaurant successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static delete = async (req, res) => {
        try {
            const data = await restaurant.delete(req.params)
            res.status(200).json({
                status: true,
                message: "Deleting restaurant successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static update = async (req, res) => {
        try {
            const data = await restaurant.update(req.body, req.params)
            res.status(200).json({
                status: true,
                message: "Updating restaurant successful",
                data
            })
        } catch (e) {
            next(e)
        }
    }

    static all = async (req, res, next) => {
        try {
            const restaurants = await restaurant.all();
            res.status(200).json({
                status: true,
                message: 'All restaurants',
                data: restaurants
            })
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = restaurantController;