const express = require('express');
const routes = express.Router();
const CompanyController = require('./controllers/CompanyController');
const CaseController = require('./controllers/CaseController');
const LoginController = require('./controllers/LoginController');
const PerfilController = require('./controllers/PerfilController');


routes.post('/login', LoginController.login);

routes.get('/perfil', PerfilController.index);


routes.get('/company', CompanyController.index);
routes.post('/company', CompanyController.create);

routes.get('/casos', CaseController.index);
routes.post('/casos', CaseController.create);
routes.delete('/casos/:id', CaseController.delete);


module.exports = routes; 