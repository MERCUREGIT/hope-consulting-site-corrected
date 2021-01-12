const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlanSchema = new Schema({


    image: {
        type: String,
        required: true,
    },
    nom:{
       type:String,
       required:true
    }

});


module.exports = mongoose.model('PlanEtDessins', PlanSchema);