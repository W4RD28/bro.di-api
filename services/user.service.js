const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const url = require('../utils/url');

class userService {
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


    
    static async generatePasswordReset(data) {
        const { email } = data;
        const resetToken = crypto.randomBytes(20).toString('hex');
        const tokenExpire = Date.now() + 3600000; //expires in an hour
        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                resetToken: resetToken,
                tokenExpire: tokenExpire
            }
        })

        const link = `${url}/user/password-reset/${user.id}/${resetToken}`;

        await sendEmail(user.email, "password reset", `The link to reset your password is ${link}`);

        return { user, link };
    }

    static async passwordReset(data, params) {
        var message;
        
        const { id, resetToken } = params;
        const token = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                resetToken,
                tokenExpire,
            }
        })

        if (token.resetToken !== params.resetToken) {
            return message = "reset token error";
        }

        if (token.tokenExpire.getTime() < Date.now() || tokenExpire === null) {
            return message = "token expiration error";
        }

        data.password = bcrypt.hashSync(data.password, 8);
        const { password } = data;
        
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                password: data.password,
                resetToken: null,
                tokenExpire: null
            }
        });

        if (!user) {
            throw createError.NotFound('User not registered')
        }

        message = "user succesfully reset password"

        return { message, user };
    }
  }
  
  module.exports = userService;