const express = require('express');
const routes = express.Router();
const CompanyController = require('./controllers/CompanyController');
const CaseController = require('./controllers/CaseController');
const LoginController = require('./controllers/LoginController');
const PerfilController = require('./controllers/PerfilController');

const multer = require('multer');
const multerConfig = require('./config/multer'); 

routes.post('/login', LoginController.login);

routes.get('/perfil', PerfilController.index);


routes.get('/company', CompanyController.index);
routes.post('/company', CompanyController.create);

routes.get('/casos', CaseController.index);
routes.post('/casos', CaseController.create);
routes.delete('/casos/:id', CaseController.delete);
routes.put('/casos/:id', multer(multerConfig).single("file"), CaseController.upload);
 


module.exports = routes; 