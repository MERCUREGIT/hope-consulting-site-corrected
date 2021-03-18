 const moment = require('moment');


 module.exports = {


     select: function(selected, options) {
         return options.fn(this).replace(new RegExp('value=\"' + selected + '\"'), '$&selected ="select"')
     },

     generateTime: (date, format) => {
         return moment(date).format("ll")
     },
     shortenText: (description, length) => {
         return description.substring(0, length)
     },
     paginate: (data, options) => {
         let result;
         for (let index = 0; index <data.length ; index++) {
            result += options.fn(index)
         }
         return result;
     },
 }