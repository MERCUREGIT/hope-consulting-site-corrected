const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CandidatureSchema = new Schema({

   nom: {type: String,required: true,},
   email: { type: String, },
   experience:{type:Number},
   phone_number: {type: String,required: true,},
   category: {type: String,required: true},
   type: {type:String, required:true},
   location: {type:String, required:true},
   date: {type: Date,default: Date.now()},
   description: { type: String, required: true, },
   cv:{type:String, required: true}
}, { usePusEach: true });
module.exports = mongoose.model('Candidature', CandidatureSchema);

