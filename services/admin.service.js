const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

class adminService {
    static async register(data) {
        const { email, password, namaAdmin } = data;
        data.password = bcrypt.hashSync(data.password, 8);
        let admin = await prisma.admin.create({
            data
        })
        data.accessToken = await jwt.signAccessToken(admin);

        return data;
    }

    static async login(data) {
        const { email, password } = data;
        const admin = await prisma.admin.findUnique({
            where: {
                email
            }
        });
        if (!admin) {
            throw createError.NotFound('Admin not registered')
        }
        const checkPassword = bcrypt.compareSync(password, admin.password)
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')
        delete admin.password
        const accessToken = await jwt.signAccessToken(admin)
        return { ...admin, accessToken }
    }

    static async profile(params) {
        const { id } = params;
        const admin = await prisma.admin.findFirst({
            where: {
                id: Number(id)
            }
        });
        if (!admin) {
            throw createError.NotFound('admin not registered')
        }
        return { ...admin }
    }

    static async delete(params) {
        const { id } = params;
        const admin = await prisma.admin.delete({
            where: {
                id: Number(id)
            }
        });
        if (!admin) {
            throw createError.NotFound('admin not registered')
        }
        return { ...admin }
    }

    static async update(data, params) {
        const { id } = params;
        const { email, namaAdmin, password } = data;
        data.password = bcrypt.hashSync(data.password, 8);
        const admin = await prisma.admin.update({
            where: {
                id: Number(id)
            },
            data: {
                email: data.email,
                namaAdmin: data.namaAdmin,
                password: data.password
            }
        });
        if (!admin) {
            throw createError.NotFound('admin not registered')
        }
        return { ...admin }
    }

    static async updateProfile(data, params) {
        const { id } = params;
        const { email, namaAdmin } = data;
        const admin = await prisma.admin.update({
            where: {
                id: Number(id)
            },
            data: {
                email: email,
                namaAdmin: namaAdmin
            }
        });
        if (!admin) {
            throw createError.NotFound('admin not registered')
        }
        return { ...admin }
    }

    static async updatePassword(data, params) {
        const { id } = params;
        const { password } = data;
        data.password = bcrypt.hashSync(data.password, 8);
        const admin = await prisma.admin.update({
            where: {
                id: Number(id)
            },
            data: {
                password: data.password
            }
        });
        if (!admin) {
            throw createError.NotFound('admin not registered')
        }
        return { ...admin }
    }
    
    static async all() {
        const alladmins = await prisma.admin.findMany();
        return alladmins;
    }
  }
  
  module.exports = adminService;