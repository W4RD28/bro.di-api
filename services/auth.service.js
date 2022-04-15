const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

class authService {
    static async register(data) {
        const { email, password, namaUser } = data;
        data.password = bcrypt.hashSync(data.password, 8);
        let user = await prisma.user.create({
            data
        })
        data.accessToken = await jwt.signAccessToken(user);

        return data;
    }

    static async login(data) {
        const { email, password } = data;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            throw createError.NotFound('User not registered')
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')
        delete user.password
        const accessToken = await jwt.signAccessToken(user)
        return { ...user, accessToken }
    }

    static async profile(params) {
        const { id } = params;
        const user = await prisma.user.findFirst({
            where: {
                id: Number(id)
            }
        });
        if (!user) {
            throw createError.NotFound('User not registered')
        }
        return { ...user }
    }

    static async delete(params) {
        const { id } = params;
        const user = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
        if (!user) {
            throw createError.NotFound('User not registered')
        }
        return { ...user }
    }

    static async update(data, params) {
        const { id } = params;
        const { email, namaUser, password } = data;
        data.password = bcrypt.hashSync(data.password, 8);
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                email: data.email,
                namaUser: data.namaUser,
                password: data.password
            }
        });
        if (!user) {
            throw createError.NotFound('User not registered')
        }
        return { ...user }
    }

    static async updateProfile(data, params) {
        const { id } = params;
        const { email, namaUser } = data;
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                email: email,
                namaUser: namaUser
            }
        });
        if (!user) {
            throw createError.NotFound('User not registered')
        }
        return { ...user }
    }

    static async updatePassword(data, params) {
        const { id } = params;
        const { password } = data;
        data.password = bcrypt.hashSync(data.password, 8);
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                password: data.password
            }
        });
        if (!user) {
            throw createError.NotFound('User not registered')
        }
        return { ...user }
    }
    
    static async all() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }
  }
  
  module.exports = authService;