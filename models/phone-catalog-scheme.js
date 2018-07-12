var mongoose = require('mongoose');
var Schema = mongoose.Schema;


if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}

var PhoneCatalogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    reference: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    created_at: {
        type: Date,
        required: false
    }
});

PhoneCatalogSchema.pre('save', function(next) {
    // change the updated_at field to current date
    this.created_at = new Date();

    next();
});

var PhoneCatalog = mongoose.model('PhoneCatalog', PhoneCatalogSchema);

module.exports = PhoneCatalog;