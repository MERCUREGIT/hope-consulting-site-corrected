module.exports = function (mongoose) {
    let env = process.env.NODE_ENV || 'development';
if (env == 'development') {
    mongoose.connect('mongodb://localhost:27017/hope-consulting?readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
    console.log("DEVELOPMENT MONGO CONNECTED");
}).catch(error => console.log(error));
}
else
{
 mongoose.connect('mongodb+srv://hopetest:1234@cluster0.mcou4.mongodb.net/hope-consulting?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
        console.log("PRODUCTION MONGO CONNECTED");
    }).catch(error => console.log(error));   
    }
}