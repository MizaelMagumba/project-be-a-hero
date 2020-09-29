const dataBaseTable = require('../database/conection');

module.exports = {

    async index(request, response) {
        const company_id = request.headers.company_id;
        const {page = 1} = request.query;

        const cases = await dataBaseTable('cases').where('companies_id', company_id)
                            .join('companies', 'companies.id', '=', 'cases.companies_id')
                            .limit(10)
                            .offset((page-1)*5)
                            .select(['cases.*',
                                    'companies.name',
                                    'companies.email',
                                    'companies.whatsapp',
                                    'companies.provincia',
                                    'companies.cidade'
                                    ]);

        return response.json(cases);
    }
}