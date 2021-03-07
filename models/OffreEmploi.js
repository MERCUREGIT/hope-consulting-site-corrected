const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OffreEmploiSchema = new Schema({

    entreprise: {type: String,required: true,},
    site_web:{type: String,},
    email: { type: String, },
    experience:{type:Number},
    phone_number: {type: String,required: true,},
    category: {type: String,required: true},
    type: {type:String, required:true},
    poste: { type: String, required: true },
    date_expiration:{type: Date, required:true},
    location: {type:String, required:true},
    date: {type: Date,default: Date.now()},
    description: { type: String, required: true, },
    isPublic:{type:Boolean, required: true, default:true,}

});


module.exports = mongoose.model('OffreEmploi', OffreEmploiSchema);