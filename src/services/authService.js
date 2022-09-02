// const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService.js');

const authService = {
    login: async (email, password) => {
        const user = await db.User.findOne({
            attributes: { exclude: ['displayName', 'image', 'createdAt', 'updatedAt'] },
            where: { email },
        });
        if (!user || !password) return null;

        const token = jwtService.createToken({ email, password });

        return token;
    },
};

module.exports = authService;