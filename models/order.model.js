const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();

function isDefined(value) {
  return value !== null && typeof value !== 'undefined';
}

function connectRelations(data, relations) {
  const d = { ...data }; // it would be better to deep clone the data

  Object.keys(relations).forEach((key) => {
    if (Object.values(relations[key]).filter(isDefined).length > 0) {
      d[key] = { connect: relations[key] };
    }
  });
  return d;
}

const foreignKeyReplacement = (input) => {	
    let output = input	
    const foreignKeys = Object.keys(input).filter((k) => k.match(/$id/))	
  
    foreignKeys.forEach((key) => {	
      const modelName = key.replace(/$id/, '')	
      const value = input[key]	
  
      delete output[key]	
      output = Object.assign(output, {	
        [modelName]: { connect: { id: value } },	
      })	
    })	
  
    return output	
  }

class orderModel {
    static async create(data) {
        const { idUser, idMeja, bookDate,
        bookHourStart, bookHourEnd, bookStatus } = data;
        data.bookDate = Date.parse(bookDate);

        let order = await prisma.order.create({
            data:{
                // idUser,
                // idMeja,
                User: {connect: {id: Number(idUser)}},
                Meja: {connect: {id: Number(idMeja)}},
                bookDate,
                bookHourEnd,
                bookHourStart,
                bookStatus,

            }
        })

        // let order = await prisma.order.create({
        //     data: foreignKeyReplacement(data)
        // })

        return order;
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