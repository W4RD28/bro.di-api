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

    static async findRestaurant(params) {
        const { id } = params;
        const resto = await prisma.restoran.findFirst({
            where: {
                id
            }
        });
        if (!resto) {
            throw createError.NotFound('Restaurant not found')
        }

        return { ...resto }
    }
    
    static async all() {
        const allRestaurants = await prisma.restoran.findMany();
        return allRestaurants;
    }
  }
  
  module.exports = restaurantModel;