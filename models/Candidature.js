const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CandidatureSchema = new Schema({

    nom:{
       type:String,
       required:true
    },
    telephone:{
       type:String,
       required:true
    },
    email:{
       type:String,
    },
    desciption:{
       type:String,
    },
    date:{
       type:Date,
       default:Date.now()
    }

}, { usePusEach: true });


module.exports = mongoose.model('Candidature', CandidatureSchema);