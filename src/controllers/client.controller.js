var ClientService = require('../services/client.service')    

exports.getClients = async function (request, response, next) {
    try {
        var clients = await ClientService.getClients()
        return response.status(200).json({ status: 200, data: clients, message: "Succesfully Clients Retrieved" });
    } catch (e) {
        next(e);
    }
}

exports.getClient = async function (request, response, next) {
    const {id} = request.params
    try {
        var client = await ClientService.getClient(id)
        if (client.length)
           response.json({ status: 200, data: client[0], message: "Succesfully Client Retrieved" })
        else
           response.status(404).send("Client not found.");    
    } catch (e) {
        next(e);
    }
}

exports.createClient = async function (request, response, next) {
    const {name,surname,email,phone} = request.body;
    try {
        var existentClient = await ClientService.getClientByEmail(email);
        if (existentClient.length)
            response.status(404).send("Client already exists with the same email address."); 

        var client_id = await ClientService.createClient(name,surname,email,phone)
        response.json({ status: 200, id:client_id, message: "Succesfully Client created" })  
    } catch (e) {
        next(e);
    }
}

exports.editClient = async function (request, response, next) {
    const {id, name,surname,email,phone} = request.body;
    try {
        var clientUpdated = await ClientService.editClient(id,name,surname,email,phone)
        if (clientUpdated)
           response.json({ status: 200, message: "Succesfully Client updated" })  
        else
           response.status(404).send("Client not found."); 
    } catch (e) {
        next(e);
    }
}

exports.deleteClient = async function (request, response, next) {
    const {id} = request.params
    try {
        var clientDeleted = await ClientService.deleteClient(id)
        if (clientDeleted)
           response.json({ status: 200, message: "Succesfully Client Deleted" })
        else
           response.status(404).send("Client not found.");    
    } catch (e) {
        next(e);
    }
}



