var orderResponseInfo = function (response, message) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    return response.send({"status": "ok", "message": message});
};

var errorMessage = function (response, type) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    if(type == 0) {
        return response.send({"status": "error", "message": "Error Database"});
    }else if(type == 1) {
        return response.send({"status": "error", "message": "Can not be created"});
    }else if(type == 2) {
        return response.send({"status": "error", "message": "Empty Order"});
    }else if(type == 3) {
        return response.send({"status": "error", "message": "Incorrect input, check the name (String),"+ 
        " surname (String), email (String), and idPhones (Array (String)) not empty"});
    }else if(type == 4) {
        return response.send({"status": "error", "message": "Endpoint Phone Catalog not found"});
    }else if(type == 5) {
        return response.send({"status": "error", "message": "One or more phones were not found in the catalog"});
    }
};

exports.orderResponseInfo = orderResponseInfo;
exports.errorMessage = errorMessage;