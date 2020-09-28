const dataBaseTable = require('../database/conection');

module.exports = {

    async index(request, response) {
        const ong_id = request.headers.ong_id;
        const {page = 1} = request.query;

        const casos = await dataBaseTable('cases').where('ongs_id', ong_id)
                            .join('ongs', 'ongs.id', '=', 'cases.ongs_id')
                            .limit(10)
                            .offset((page-1)*5)
                            .select(['cases.*',
                                    'ongs.name',
                                    'ongs.email',
                                    'ongs.whatsapp',
                                    'ongs.provincia',
                                    'ongs.cidade'
                                    ]);

        return response.json(casos);
    }
}