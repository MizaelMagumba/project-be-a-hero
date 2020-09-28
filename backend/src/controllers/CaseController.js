const dataBaseTable = require('../database/conection');

module.exports = {

    async index(req, res) {

        const {page = 1} = req.query;
        const [count] = await dataBaseTable('cases').count();

        const casos = await dataBaseTable('cases')
        .join('ongs', 'ongs.id', '=', 'cases.ongs_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['cases.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.provincia', 
                'ongs.cidade'
        ]);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(casos);
    },

    async create(req, res) {
        const {title, description, value} = req.body;
        
        const ongs_id = req.headers.ong_id;

        const [id] = await dataBaseTable('cases').insert({
            title,
            description,
            ongs_id,
            value,
        });
        
        return res.json({id});
    },

    async delete(req, res) {

        const {id} = req.params;
        const ongs_id = req.headers.ong_id;

        const caso = await dataBaseTable('cases').where('id', id)
            .select('ongs_id')
            .first();

        if(caso.ongs_id !== ongs_id) { 
            return res.status(401).json({error: 'Operacao nao permitida.'});
        };

        await dataBaseTable('cases').where('id', id).delete();

        return res.status(200).send();

    }
}