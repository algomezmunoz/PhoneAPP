// Database
var phoneModel = require('./../models/phone-catalog-scheme');

const logConfig = require('../config/log-conf');
const logger = require('js-logging').dailyFile([logConfig.getLogSettings()]);

function insertCatalog(){
    phoneModel.find({}, function(err,obj) {
        if(err){
            logger.info("Err");
        }else if (obj && obj.length == 0){
            logger.info("Prepare the catalog");
            for (let index = 0; index < 100; index++) {
                var name = "M"+index;
                var description = "This is the model M"+index;
                var reference = "/usr/var/imgM"+index;
                var price = - Math.round(Math.random() * (100 - 1000) * 100) / 100;
                insertPhone(name, description, reference, price);
                if(index == 99){
                    logger.info("End Insertion");
                }
            }
        }else if (obj){
            logger.info("Data found, not inserting data");
        }else{
            logger.info("Something happend");
        }
    });
}

function insertPhone(name, description, reference, price){
    var phoneModelC = phoneModel({
        name: name,
        description: description,
        reference: reference,
        price: price
    });
    phoneModelC.save(function (err) {
        if (err) {
            logger.info("Error inserting catalog");
        }
    });
}

exports.insertCatalog = insertCatalog;