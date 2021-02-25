const database = require('../database/connection');

exports.getClients = async function () {
    try{
        var clients = await database.select("*").table("clients");
        return clients;
    }catch(error) {
        throw error;
    }
}

exports.getClient = async function (id) {
    try{
        var client = await database.select("*").table("clients").where({id:id});
        return client;
    }catch(error) {
        throw error;
    }
}

exports.getClientByEmail = async function (email) {
    try{
        var client = await database.select("*").table("clients").where({email});
        console.log('client',client)
        return client;
    }catch(error) {
        throw error;
    }
}

exports.createClient = async function (name,surname,email,phone) {
    try{
        var client_id = await database.insert({name,surname,email,phone}).table("clients");
        return client_id[0];
    }catch(error) {
        throw error;
    }
}

exports.editClient = async function (id,name,surname,email,phone) {
    try{
        var clientUpdated = await database.where({id:id}).update({name,surname,email,phone}).table("clients");
        return clientUpdated;
    }catch(error) {
        throw error;
    }
}

exports.deleteClient = async function (id) {
    try{
        var clientDeleted = await database.where({id:id}).del().table("clients");
        return clientDeleted;
    }catch(error) {
        throw error;
    }
}
