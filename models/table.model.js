const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();

class tableModel {
    static async create(data) {
        const { idRestoran, slotBangku, hargaMeja } = data;
        let table = await prisma.meja.create({
            data
        })
        let restoUpdate = await prisma.restoran.update({
            where: {
                id: Number(idRestoran)
            },
            data: {
                slotMeja: {
                    increment: 1
                }
            }
        })

        return data;
    }

    static async find(params) {
        const { id } = params;
        const table = await prisma.meja.findFirst({
            where: {
                id: Number(id)
            }
        });
        if (!table) {
            throw createError.NotFound('table not found')
        }
        return { ...table }
    }

    static async search(params) {
        const { searchParams } = params;
        const tables = await prisma.meja.findMany({
            where: {
                namameja: {
                    contains: searchParams,
                    mode: 'insensitive'
                }
            }
        });
        if (!tables) {
            throw createError.NotFound('table not found')
        }
        return { ...tables }
    }

    static async delete(params) {
        const { id } = params;
        const table = await prisma.meja.delete({
            where: {
                id: Number(id)
            }
        });
        if (!table) {
            throw createError.NotFound('table not found')
        }
        const restoUpdate = await prisma.restoran.update({
            where: {
                id: Number(table.idRestoran)
            },
            data: {
                slotMeja: {
                    decrement: 1
                }
            }
        })

        return { ...table }
    }

    static async update(data, params) {
        const { idRestoran, slotBangku, hargaMeja } = data;
        const { id } = params;
        const table = await prisma.meja.update({
            where: {
                id: Number(id)
            },
            data: {
                idRestoran, 
                slotBangku, 
                hargaMeja
            }
        });
        if (!table) {
            throw createError.NotFound('table not found')
        }
        return { ...table }
    }
    
    static async all() {
        const allTables = await prisma.meja.findMany();
        return allTables;
    }
  }
  
  module.exports = tableModel;