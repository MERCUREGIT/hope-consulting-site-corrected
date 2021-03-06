 const moment = require('moment');


 module.exports = {


     select: function(selected, options) {
         return options.fn(this).replace(new RegExp('value=\"' + selected + '\"'), '$&selected ="select"')
     },

     generateTime: (date, format) => {
         return moment(date).format(format)
     },
     shortenText: (description, length) => {
         return description.substring(0, length)
     }

 }