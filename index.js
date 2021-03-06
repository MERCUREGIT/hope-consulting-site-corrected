const express = require('express');
const app = express();
const path = require('path');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const morgan = require('morgan');
const helmet = require('helmet')
const http2 = require('http2');

// mongoose.connect('mongodb+srv://hopetest:1234@cluster0.mcou4.mongodb.net/hope-consulting?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
    //     console.log("MONGO CONNECTED");
    // }).catch(error => console.log(error));
// app.use(helmet());
mongoose.connect('mongodb://localhost:27017/hope-consulting?readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
    console.log("MONGO CONNECTED");
}).catch(error => console.log(error));

app.use(express.static(path.join(__dirname, 'public/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload());
app.use(compression());

//  list of domains white listed 
// const whiteList =['http://localhost:8000','http://localhost:3000/','https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'];
// const corsOptions={
//     origin: function(origin, callback) {
//         if(whiteList.indexOf(origin) !== -1){
//             callback(null, true);
//         }else{
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// }
app.use(cors());


app.use(morgan('tiny'));
app.use(methodOverride('_method'));

const { select, generateTime, shortenText } = require('./helpers/handlebars-helpers');
app.engine('handlebars', exphbs({
    defaultLayout: 'home',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: { select: select, generateTime: generateTime, shortenText:shortenText }
}));
app.set('view engine', 'handlebars');



// load routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');

// Use routes
app.use('/', home);
app.use('/admin', admin);

// setting up server end port number
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Listening on port ${8000}`);
});

