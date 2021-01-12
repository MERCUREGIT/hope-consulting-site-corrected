const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RealisationSchema = new Schema({


    image: {
        type: String,
        required: true,
    },
    nom:{
       type:String,
       required:true
    }

}, { usePusEach: true });


module.exports = mongoose.model('RealisationEtSuivie', RealisationSchema);