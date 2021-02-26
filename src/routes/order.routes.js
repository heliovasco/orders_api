const router = require('express').Router();
const schemas = require('../schemas/order.schemas'); 
const inputValidation = require('../middleware/inputValidation'); 

const OrderController = require('../controllers/order.controller') 

router.post('/order/create',inputValidation(schemas.orderPOST), OrderController.createOrder)
router.delete('/order/:id', inputValidation(schemas.orderDELETE, 'params'),OrderController.deleteOrder)
router.get('/orders', OrderController.getOrders)
router.get('/order/:id', inputValidation(schemas.orderGET, 'params'), OrderController.getOrder)
router.patch('/order/:id',inputValidation(schemas.orderPATCH), OrderController.editOrder)
router.post('/order/:id/addOrderItem', inputValidation(schemas.orderItemAddPOST), OrderController.addOrderItem)
router.delete('/order/:order_id/item/:item_id', OrderController.deleteOrderItem)

module.exports = router