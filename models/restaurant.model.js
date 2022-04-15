const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();

class restaurantModel {
    static async createRestaurant(data) {
        const { namaRestoran, lokasiRestoran, gambarRestoran, gambarMenu,
        slotMeja } = data;
        let resto = await prisma.restoran.create({
            data
        })

        return data;
    }

    static async findRestaurant(data) {
        const { id } = data;
        const resto = await prisma.restoran.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            throw createError.NotFound('Restaurant not found')
        }
    }
    
    static async all() {
        const allRestaurants = await prisma.restoran.findMany();
        return allRestaurants;
    }
  }
  
  module.exports = restaurantModel;