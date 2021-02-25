const router = require('express').Router();
const schemas = require('../schemas/client.schemas'); 
const inputValidation = require('../middleware/inputValidation'); 

const ClientController = require('../controllers/client.controller') 

router.get('/clients', ClientController.getClients)
router.get('/client/:id', inputValidation(schemas.clientGET, 'params'),ClientController.getClient)
router.post('/client/create',inputValidation(schemas.clientCreatePOST), ClientController.createClient)
router.post('/client/edit', inputValidation(schemas.clientUpdatePOST),ClientController.editClient)
router.delete('/client/:id', inputValidation(schemas.clientDELETE, 'params'), ClientController.deleteClient)

module.exports = router