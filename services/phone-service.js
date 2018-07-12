// Return Messages
var phoneMessages = require('./../messages/phone-messages');

// Database
var phoneModel = require('./../models/phone-catalog-scheme');

function getPhoneCatalog(response) {
    phoneModel.find({}, function(err,obj) {
        if(err){
            phoneMessages.errorMessage(response, 0)
        }else if (obj){
            phoneMessages.phoneCatalogResponseInfo(response, obj);
        }else{
            phoneMessages.errorMessage(response, 2);
        }
    });
};

function createPhone(request, response) {

    var name = request.body.name;
    var description = request.body.description;
    var reference = request.body.reference;
    var price = request.body.price;

    if (name && description && reference && price) {

        var phoneModelC = phoneModel({
            name: name,
            description: description,
            reference: reference,
            price: price
        });
        phoneModelC.save(function (err) {
            if (err) {
                phoneMessages.errorMessage(response, 1);
            } else {
                phoneMessages.phoneCatalogResponseInfo(response, phoneModelC);
            }
        });
    } else{
        phoneMessages.errorMessage(response,3);
    }
};

exports.getPhoneCatalog = getPhoneCatalog;
exports.createPhone = createPhone;