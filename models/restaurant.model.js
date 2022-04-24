const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();

class restaurantModel {
    static async create(data) {
        const { namaRestoran, lokasiRestoran, gambarRestoran, gambarMenu,
        slotMeja } = data;
        let resto = await prisma.restoran.create({
            data
        })

        return data;
    }

    static async find(params) {
        const { id } = params;
        const resto = await prisma.restoran.findFirst({
            where: {
                id: Number(id)
            }
        });
        if (!resto) {
            throw createError.NotFound('Restaurant not found')
        }
        return { ...resto }
    }

    static async search(params) {
        const { searchParams } = params;
        const restos = await prisma.restoran.findMany({
            where: {
                namaRestoran: {
                    contains: searchParams,
                    mode: 'insensitive'
                }
            }
        });
        if (!restos) {
            throw createError.NotFound('Restaurant not found')
        }
        return { ...restos }
    }

    static async delete(params) {
        const { id } = params;
        const resto = await prisma.restoran.delete({
            where: {
                id: Number(id)
            }
        });
        if (!resto) {
            throw createError.NotFound('Restaurant not found')
        }
        return { ...resto }
    }

    static async update(data, params) {
        const { namaRestoran, lokasiRestoran, gambarRestoran, gambarMenu,
            slotMeja } = data;
        const { id } = params;
        const resto = await prisma.restoran.update({
            where: {
                id: Number(id)
            },
            data: {
                namaRestoran,
                lokasiRestoran,
                gambarRestoran,
                gambarMenu,
                slotMeja

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