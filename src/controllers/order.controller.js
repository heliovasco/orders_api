var OrderService = require('../services/order.service')    

exports.getOrders = async function (request, response, next) {
    try {
        var orders = await OrderService.getOrders()
        return response.status(200).json({ status: 200, data: orders, message: "Succesfully Orders Retrieved" });
    } catch (e) {
        next(e);
    }
}

exports.getOrder = async function (request, response, next) {
    const {id} = request.params
    try {
        var order = await OrderService.getOrder(id)
        if (order.length){
            order = order[0];
            order.items = await OrderService.getOrderItems(id);
            response.json({ status: 200, data: order, message: "Succesfully Order Retrieved" });
        }
        else
           response.status(404).send("Order not found.");    
    } catch (e) {
        next(e);
    }
}

exports.createOrder = async function (request, response, next) {
    const {reference_number,client_id,date,address,total,items} = request.body
    const order_date = new Date(date)

    try {
        var order_id = await OrderService.createOrder(reference_number,client_id,order_date,address,total,items)
        response.json({ status: 200, id:order_id, message: "Succesfully Order created" })  
    } catch (e) {
        next(e);
    }
}

exports.editOrder = async function (request, response, next) {
    const {id,reference_number,client_id,date,address,total} = request.body;
    const order_date = new Date(date)
    try {
        var orderUpdated = await OrderService.editOrder(id,reference_number,client_id,order_date,address,total)
        if (orderUpdated)
           response.json({ status: 200, message: "Succesfully Order updated" })  
        else
           response.status(404).send("Order not found."); 
    } catch (e) {
        next(e);
    }
}

exports.deleteOrder = async function (request, response, next) {
    const {id} = request.params
    try {
        var orderDeleted = await OrderService.deleteOrder(id)
        if (orderDeleted)
           response.json({ status: 200, message: "Succesfully Order Deleted" })
        else
           response.status(404).send("Order not found.");    
    } catch (e) {
        next(e);
    }
}

exports.addOrderItem = async function (request, response, next) {
    const {order_id,qty,price} = request.body

    try {
        var order = await OrderService.getOrder(order_id)
        if (!order.length){
            response.status(404).send("Order not found."); 
        }

        var orderItemId = await OrderService.addOrderItem(order_id,qty,price);

        response.json({ status: 200, id: orderItemId, message: "Succesfully Order item created" })   
    } catch (e) {
        next(e);
    }
}

exports.deleteOrderItem = async function (request, response, next) {
    const {order_id, item_id} = request.params
    try {
        const deletedOrderItem = await OrderService.deleteOrderItem(order_id, item_id);
        if (deletedOrderItem)
           response.json({ status: 200, message: "Succesfully Order Item Deleted" })
        else 
           response.status(404).send("Order Item not found.");  

    }catch(e){
        next(e);
    }
}

