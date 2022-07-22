const express = require('express');

const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller')
const Produto = require('./controllers/produtos.controller')
const Estoque = require('./controllers/estoques.controller')

routes.get('/', Usuario.index);

//Rotas de Usuários
routes.post('/api/usuarios', Usuario.create);
routes.get('/api/usuarios', Usuario.index);
routes.get('/api/usuarios.details/:_id', Usuario.details);
routes.delete('/api/usuarios/:_id', Usuario.delete);
routes.put('/api/usuarios', Usuario.update);

//Rotas de Produtos
routes.post('/api/produtos', Produto.create);
routes.get('/api/produtos', Produto.index);
routes.get('/api/produtos.details/:_id', Produto.details);
routes.delete('/api/produtos/:_id', Produto.delete);
routes.put('/api/produtos', Produto.update);

//Rotas de Estoques
routes.post('/api/estoques', Estoque.create);
routes.get('/api/estoques', Estoque.index);
routes.get('/api/estoques.details/:_id', Estoque.details);
routes.delete('/api/estoques/:_id', Estoque.delete);
routes.put('/api/estoques', Estoque.update);

module.exports = routes