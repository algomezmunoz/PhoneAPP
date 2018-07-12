var express = require("express");
var cluster = require('cluster');
var bodyParser = require("body-parser");
var checkMongoDB = require("./services/insert-catalog");
var app = express();

const logConfig = require('./config/log-conf');
const logger = require('js-logging').dailyFile([logConfig.getLogSettings()]);

//Libreria de threads

var server = require('http').Server(app);

checkMongoDB.insertCatalog();

// Aceptaremos JSON y valores codificados en la propia URL
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({limit: '4mb',extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Todos los endpoint del API los colocaremos en este fichero
var routes = require("./routes/routes.js")(app);

server.listen(3000, function() {
    console.log("Servidor escuchando peticiones en el puerto " + server.address().port);
    logger.info("Servidor escuchando peticiones en el puerto " + server.address().port);
});




module.exports = app;