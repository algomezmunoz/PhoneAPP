
//Mongo URL Docker
var domainDB = 'mongodb://mongo:27017/challenge';
//var domainDB = 'mongodb://localhost:27017/challenge';

//API URI Docker
//var localURI = "http://0.0.0.0:3000";
var localURI = "http://localhost:3000";
var pathPhoneCatalog = "/api/challenge/phonesCatalog";

exports.localURI = localURI;
exports.pathPhoneCatalog = pathPhoneCatalog;
exports.domainDB = domainDB;