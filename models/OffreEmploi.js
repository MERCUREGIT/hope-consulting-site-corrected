const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OffreEmploiSchema = new Schema({

    vendor_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone_number: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    topic:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    loaction:{
        type:String,
        required: true,
    }

});


module.exports = mongoose.model('OffreEmploi', OffreEmploiSchema);