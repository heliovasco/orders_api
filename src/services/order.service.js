const database = require('../database/connection');

exports.getOrders = async function () {
    try{
        var orders = await database.select("*").table("orders");
        return orders;
    }catch(error) {
        throw error;
    }
}

exports.getOrder = async function (id) {
    try{
        var order = await database.select("*").table("orders").where({id:id});
        return order;
    }catch(error) {
        throw error;
    }
}

exports.getOrderItems = async function (id) {
    try{
        var items = await database.select("*").table("order_items").where({order_id:id});
        return items;
    }catch(error) {
        throw error;
    }
}


exports.createOrder = async function (reference_number,client_id,date,address,total,items) {
    try{
        var order_id = await database.insert({reference_number,client_id,date,address,total}).table("orders");
        order_id = order_id[0];
        if (items) {
            const order_items = items.map((item)=> {return {...item,total:item.qty*item.price, order_id:order_id}});
            await database.insert(order_items).table("order_items");
        }
        
        return order_id;
    }catch(error) {
        throw error;
    }
}

exports.editOrder = async function (id, reference_number,client_id,date,address,total) {
    try{
        var orderUpdated = await database.where({id:id}).update({reference_number,client_id,date,address,total}).table("orders");
        return orderUpdated;
    }catch(error) {
        throw error;
    }
}


exports.deleteOrder = async function (id) {
    try{
        var orderDeleted = await database.where({id:id}).del().table("orders");
        await database.where({order_id:id}).del().table("order_items");

        return orderDeleted;
    }catch(error) {
        throw error;
    }
}


exports.addOrderItem = async function (order_id,qty,price) {
    const total = qty*price;
    try{
        var orderItemId = await database.insert({order_id,qty,price,total}).table("order_items");
        await database.where({id:order_id}).update({total:database.raw(`?? + ${total}`, ['total'])}).table("orders")
        return orderItemId[0];
    }catch(error) {
        throw error;
    }
}

exports.deleteOrderItem = async function (order_id,item_id) {
    try{

        var orderItem = await database.select("*").table("order_items").where({id:item_id,order_id:order_id});
        if (!orderItem.length)
            return false;
        
        const totalDeleted = orderItem[0].total;
       
        await database.where({id:item_id, order_id: order_id}).del().table("order_items");

        await database.where({id:order_id}).update({total:database.raw(`?? - ${totalDeleted}`, ['total'])}).table("orders")

        return true;
    }catch(error) {
        throw error;
    }
}