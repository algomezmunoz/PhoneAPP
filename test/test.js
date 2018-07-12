let mongoose = require("mongoose");
let orderModel = require('../models/order-scheme');
let phoneModel = require('../models/phone-catalog-scheme');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Challenge Testing', () => {

    var phoneList = [];
    
    /*
    * Test the /GET route
    */
    describe('/GET phonesCatalog', () => {
        it('it should GET all the phones catalog', (done) => {
            chai.request(server)
                .get('/api/challenge/phonesCatalog')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.be.a('array');
                    res.body.should.have.property('status').eql("ok");
                    var phones = res.body.message.slice(0, 2);
                    phones.forEach(element => {
                        phoneList.push(element._id);
                    });
                    done();
                });
        });
    });

    /*
    * Test the /POST order
    */
    describe('/POST order', () => {
        it('it should POST a new order and return the Total price', (done) => {
            let order = {
                name: "Tom",
                surname: "Straus",
                email: "ts@ts.es",
                idPhones: phoneList
            }
            chai.request(server)
                .post('/api/challenge/order')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql("ok");
                    done();
                });
        });
    });

    /*
    * Test the /POST order
    */
    describe('/POST order', () => {
        it('it should POST a new order with empty list of phones', (done) => {
            let order = {
                name: "Tom",
                surname: "Straus",
                email: "ts@ts.es",
                idPhones: []
            }
            chai.request(server)
                .post('/api/challenge/order')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql("Incorrect input, check the name (String), " +
                    "surname (String), email (String), and idPhones (Array (String)) not empty");
                    done();
                });
        });
    });

    /*
    * Test the /POST order
    */
   describe('/POST order', () => {
        it('it should POST a new order with incorrect ids of phones', (done) => {
            let order = {
                name: "Tom",
                surname: "Straus",
                email: "ts@ts.es",
                idPhones: ["aaa","bbb","ccc"]
            }
            chai.request(server)
                .post('/api/challenge/order')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql("One or more phones were not found in the catalog");
                    done();
                });
        });
    });

    /*
    * Test the /POST order
    */
   describe('/POST order', () => {
        it('it should POST a new order with incorrect ids of phones', (done) => {
            let order = {
                name: "Tom",
                surname: "Straus",
                email: "ts@ts.es",
                idPhones: ["aaa","bbb","ccc"]
            }
            chai.request(server)
                .post('/api/challenge/order')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql("One or more phones were not found in the catalog");
                    done();
                });
        });
    });

        
    /*
    * Test the /POST order
    */
   describe('/POST order', () => {
        it('it should POST a new order with empty list of phones', (done) => {
            let order = {
                name: "Tom",
                idPhones: phoneList
            }
            chai.request(server)
                .post('/api/challenge/order')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql("Incorrect input, check the name (String), " +
                    "surname (String), email (String), and idPhones (Array (String)) not empty");
                    done();
                });
        });
    });

    /*
    * Test the /GET phonesCatalog
    */
   describe('/GET order', () => {
        it('it should GET a list of 1 order', (done) => {
            chai.request(server)
                .get('/api/challenge/order')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.be.a('array');
                    res.body.message.length.should.be.least(1);
                    done();
                });
        });
    });
});