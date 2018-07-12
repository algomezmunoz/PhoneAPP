//Lib
var requestClient = require('request');

// Configurations
var config = require('../config/config.js');

// Return Messages
var orderMessages = require('./../messages/order-messages');

// Database
var orderModel = require('./../models/order-scheme');

function getOrder(response) {
    orderModel.find({}, function(err,obj) {
        if(err){
            orderMessages.errorMessage(response, 0);
        }else if (obj){
            orderMessages.orderResponseInfo(response, obj);
        }else{
            orderMessages.errorMessage(response, 2);
        }
    });
};

function createOrder(request, response) {

    var name = request.body.name;
    var surname = request.body.surname;
    var email = request.body.email;
    var idPhones = request.body.idPhones;

    if (name && surname && email && idPhones && idPhones.length > 0) {
        // Configure the request
        const options = {  
            url: config.localURI + config.pathPhoneCatalog,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        
        requestClient(options,function(err,res,body){
            if(err) {
                orderMessages.errorMessage(response, 0);
            }else if(res.statusCode !== 200 ){
                orderMessages.errorMessage(response, 4);
            }else{   
                let catalog = JSON.parse(body).message;

                var index = 0,total = 0;
                var error = false;

                //Find the phones and save the total price
                while(index < idPhones.length && error == false){
                    var result = catalog.find(o => o._id === idPhones[index]);

                    if(result){
                        total += result.price;
                        index ++;
                    }else{
                        error = true;
                        orderMessages.errorMessage(response, 5);
                    }
                }

                if(!error){
                    //Save the order
                    var orderModelC = orderModel({
                        name: name,
                        surname: surname,
                        email: email,
                        idPhones: idPhones
                    });
                    orderModelC.save(function (err) {
                        if (err) {
                            orderMessages.errorMessage(response, 1);
                        } else {
                            orderMessages.orderResponseInfo(response, "Total Price for the phones: " + total);
                        }
                    });
                }
            }
        });
    } else{
        orderMessages.errorMessage(response,3);
    }
};

exports.getOrder = getOrder;
exports.createOrder = createOrder;