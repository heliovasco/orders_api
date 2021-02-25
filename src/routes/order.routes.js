const router = require('express').Router();
const schemas = require('../schemas/order.schemas'); 
const inputValidation = require('../middleware/inputValidation'); 

const OrderController = require('../controllers/order.controller') 

router.post('/order/create',inputValidation(schemas.orderCreatePOST), OrderController.createOrder)
router.delete('/order/:id', inputValidation(schemas.orderDELETE, 'params'),OrderController.deleteOrder)
router.get('/orders', OrderController.getOrders)
router.get('/order/:id', inputValidation(schemas.orderGET, 'params'), OrderController.getOrder)
router.post('/order/edit',inputValidation(schemas.orderUpdatePOST), OrderController.editOrder)
router.post('/order/addOrderItem', inputValidation(schemas.orderItemAddPOST), OrderController.addOrderItem)
router.delete('/order/:order_id/item/:item_id', OrderController.deleteOrderItem)

module.exports = router