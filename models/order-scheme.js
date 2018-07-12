var mongoose = require('mongoose');
var Schema = mongoose.Schema;


if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}

var OrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    idPhones: {
        type: Array,
        required: false
    },
    created_at: {
        type: Date,
        required: false
    }
});

OrderSchema.pre('save', function(next) {
    // change the updated_at field to current date
    this.created_at = new Date();

    next();
});

var OrderClient = mongoose.model('OrderClient', OrderSchema);

module.exports = OrderClient;