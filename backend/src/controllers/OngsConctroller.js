const dataBaseTable = require('../database/conection');
const crypto = require('crypto');

module.exports = {

    async index(req, res) {
        const ongs = await dataBaseTable('ongs').select('*');

        return res.json(ongs);
    },

    async create(req, res) {
        const { name, email, whatsapp, provincia, cidade} = req.body;
        const id = crypto.randomBytes(4).toString('hex');

        await dataBaseTable('ongs').insert({
            id,
            name,
            whatsapp,
            email,
            provincia,
            cidade,
        });

        return res.json({id})
    }
};