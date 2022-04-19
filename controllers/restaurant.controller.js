const resto = require('../models/restaurant.model');
const createError = require('http-errors');

class restaurantController {
    static createRestaurant = async (req, res, next) => {
        try {
            const restaurant = await resto.createRestaurant(req.body);
            res.status(200).json({
                status: true,
                message: 'Restaurant created successfully',
                data: restaurant
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }

    static findRestaurant = async (req, res) => {
        try {
            const data = await resto.findRestaurant(req.params)
            res.status(200).json({
                status: true,
                message: "Getting restaurant successful",
                data
            })
        } catch (e) {
            res.status(500).send('Something went wrong');
        }
    }

    static all = async (req, res, next) => {
        try {
            const restaurants = await resto.all();
            res.status(200).json({
                status: true,
                message: 'All restaurants',
                data: restaurants
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }
}

module.exports = restaurantController;