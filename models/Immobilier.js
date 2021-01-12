const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Immobilier = new Schema({

    offre: {
        type:Boolean,
        default: false
    },
    vendor_name: {
        type: String,
        required: true,
    },
    contact_vissibility_status: {
        type: Boolean,
        default: false,
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

}, { usePusEach: true });


module.exports = mongoose.model('OffreImmobiliers', Immobilier);