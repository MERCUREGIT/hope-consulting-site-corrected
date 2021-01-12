const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArchitectureSchema = new Schema({


    image: {
        type: String,
        required: true,
    },
    nom:{
       type:String,
       required:true
    }

});


module.exports = mongoose.model('Architectures', ArchitectureSchema);