const router = require('express').Router();
const schemas = require('../schemas/client.schemas'); 
const inputValidation = require('../middleware/inputValidation'); 

const ClientController = require('../controllers/client.controller') 

router.get('/clients', ClientController.getClients)
router.get('/client/:id', inputValidation(schemas.clientGET, 'params'),ClientController.getClient)
router.post('/client/create',inputValidation(schemas.clientPOST), ClientController.createClient)
router.patch('/client/:id', inputValidation(schemas.clientPATCH),ClientController.editClient)
router.delete('/client/:id', inputValidation(schemas.clientDELETE, 'params'), ClientController.deleteClient)

module.exports = router