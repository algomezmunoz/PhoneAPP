var phoneCatalogResponseInfo = function (response, message) {
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
        return response.send({"status": "error", "message": "Empty Catalog"});
    }else if(type == 3) {
        return response.send({"status": "error", "message": "Incorrect input"});
    }
};

exports.phoneCatalogResponseInfo = phoneCatalogResponseInfo;
exports.errorMessage = errorMessage;