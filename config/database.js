const { deleteOne } = require("../models/Immobilier");

module.exports = function (mongoose,done=function(){}) {
    let env = process.env.NODE_ENV || 'development';
if (env == 'development') {
    return mongoose.connect('mongodb://localhost:27017/hope-consulting?readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
    done()
    console.log("DEVELOPMENT MONGO CONNECTED");
});
}
else
{
    return mongoose.connect('mongodb+srv://hopetest:1234@cluster0.mcou4.mongodb.net/hope-consulting?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
        done()
        console.log("PRODUCTION MONGO CONNECTED");
    });   
    }
}