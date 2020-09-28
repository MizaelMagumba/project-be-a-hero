const dataBaseTable = require('../database/conection');

module.exports = {
    async login(request, response) {

        const {id} = request.body;

        const ongName = await dataBaseTable('ongs').where('id', id)
                        .select('name')
                        .first();
        
        if(!ongName) {
            return response.status(401).json({error: 'ID nao encontrado!'});
        };

        return response.json(ongName);

    },
}