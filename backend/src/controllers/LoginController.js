const dataBaseTable = require('../database/conection');

module.exports = {
    async login(request, response) {

        const {id} = request.body;

        const companyName = await dataBaseTable('companies').where('id', id)
                        .select('name')
                        .first();
        
        if(!companyName) {
            return response.status(401).json({error: 'ID nao encontrado!'});
        };

        return response.json(companyName);

    },
}