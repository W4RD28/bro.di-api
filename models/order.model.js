const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();

class orderModel {
    static async create(data) {
        const { namaorder, lokasiorder, gambarorder, gambarMenu,
        slotMeja } = data;
        let order = await prisma.order.create({
            data
        })

        return data;
    }

    static async find(params) {
        const { id } = params;
        const order = await prisma.order.findFirst({
            where: {
                id: Number(id)
            }
        });
        if (!order) {
            throw createError.NotFound('order not found')
        }
        return { ...order }
    }

    static async search(params) {
        const { searchParams } = params;
        const orders = await prisma.order.findMany({
            where: {
                namaorder: {
                    contains: searchParams,
                    mode: 'insensitive'
                }
            }
        });
        if (!orders) {
            throw createError.NotFound('order not found')
        }
        return { ...orders }
    }

    static async delete(params) {
        const { id } = params;
        const order = await prisma.order.delete({
            where: {
                id: Number(id)
            }
        });
        if (!order) {
            throw createError.NotFound('order not found')
        }
        return { ...order }
    }

    static async update(data, params) {
        const { namaorder, lokasiorder, gambarorder, gambarMenu,
            slotMeja } = data;
        const { id } = params;
        const order = await prisma.order.update({
            where: {
                id: Number(id)
            },
            data: {
                namaorder,
                lokasiorder,
                gambarorder,
                gambarMenu,
                slotMeja

            }
        });
        if (!order) {
            throw createError.NotFound('order not found')
        }
        return { ...order }
    }
    
    static async all() {
        const allOrders = await prisma.order.findMany();
        return allOrders;
    }
  }
  
  module.exports = orderModel;