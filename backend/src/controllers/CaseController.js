const dataBaseTable = require('../database/conection');


module.exports = {

    async index(req, res) {

        const {page = 1} = req.query;
        const [count] = await dataBaseTable('cases').count();

        const casos = await dataBaseTable('cases')
        .join('companies', 'companies.id', '=', 'cases.companies_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['cases.*', 
                'companies.name', 
                'companies.email', 
                'companies.whatsapp', 
                'companies.provincia', 
                'companies.cidade'
        ]);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(casos);
    },

    async create(req, res) {
        const {title, description, value} = req.body;
        
        const companies_id = req.headers.company_id;

        const [id] = await dataBaseTable('cases').insert({
            title,
            description,
            companies_id,
            value,
        });
        
        return res.json({id});
    },

    async delete(req, res) {

        const {id} = req.params;
        const companies_id = req.headers.company_id;

        const caso = await dataBaseTable('cases').where('id', id)
            .select('companies_id')
            .first();

        if(caso.companies_id !== companies_id) { 
            return res.status(401).json({error: 'Operacao nao permitida.'});
        };

        await dataBaseTable('cases').where('id', id).delete();

        return res.status(200).send();

    },

    async upload(req, res) {

         
        const {id} = req.params;
        const company_id = req.headers.company_id;

        const caso =  await dataBaseTable('cases').where('id', id)
                            .select('companies_id').first();

        if (caso.companies_id !== company_id) {
            return res.status(401).json({error: 'Operacao nao permitida'});
        }

        await dataBaseTable('cases').where('id', id).update('filename', req.file.filename);
        return res.status(200).send();
    },

    
}