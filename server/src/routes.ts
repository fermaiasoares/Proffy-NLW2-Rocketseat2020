import express from 'express';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
//GET: Buscar ou Listar uma informação
//POST: Cria uma informação
//PUT: Atualiza uma informação
//DELETE: Deleta uma informação

// Body (REQUEST BODY): Dados para Criação ou atualização de uma informação
// Route Params: Identificar qual recurso eu quero atualizar ou deletar
// Query Params: Paginação, Filtros, Ordenação, Etc

routes.post('/classes', classesController.create)
routes.get('/classes', classesController.index)

routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes;