
var appRouter = function (app) {

    var orderService = require('./../services/order-service.js');
    var phoneService = require('./../services/phone-service.js');


    const logConfig = require('../config/log-conf');
    const logger = require('js-logging').dailyFile([logConfig.getLogSettings()]);

    //region User
    app.get("/api/challenge/phonesCatalog", function (request, response) {
        logger.info("GET /api/challenge/phonesCatalog");
        phoneService.getPhoneCatalog(response);
    });

    app.post("/api/challenge/phonesCatalog", function (request, response) {
        logger.info("POST /api/challenge/phonesCatalog");
        phoneService.createPhone(request, response);
    });

    app.get("/api/challenge/order",  function (request, response) {
        logger.info("GET /api/challenge/order");
        orderService.getOrder(response);
    });

    app.post("/api/challenge/order",  function (request, response) {
        logger.info("POST /api/challenge/order");
        orderService.createOrder(request, response);
    });
    //endregion
};

module.exports = appRouter;
