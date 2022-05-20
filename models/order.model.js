const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();

class orderModel {
    static async create(data) {
        const { idUser, idMeja, bookDate,
        bookHourStart, bookHourEnd, bookStatus } = data;
        let order = await prisma.order.create({
            data:{
                bookDate,
                bookHourEnd,
                bookHourStart,
                bookStatus,
                idUser: { connect: { id: Number(idUser) } },
                idMeja: { connect: { id: Number(idMeja) }}
            }
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

    static async findAllByUserId(params) {
        const { userId } = params;
        const order = await prisma.order.findMany({
            where: {
                userId: Number(userId)
            }
        });
        if (!order) {
            throw createError.NotFound('order not found')
        }
        return { ...order }
    }

    static async findSameHour(params) {
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
        const { idUser, idMeja, bookDate,
            bookHourStart, bookHourEnd, bookStatus } = data;
        const { id } = params;
        const order = await prisma.order.update({
            where: {
                id: Number(id)
            },
            data: {
                idUser, 
                idMeja, 
                bookDate,
                bookHourStart, 
                bookHourEnd, 
                bookStatus
            }
        });
        if (!order) {
            throw createError.NotFound('order not found')
        }
        return { ...order }
    }

    static async updateStatus(data, params) {
        const { bookStatus } = data;
        const { id } = params;
        const order = await prisma.order.update({
            where: {
                id: Number(id)
            },
            data: {
                bookStatus
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