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
// app.use(helmet());


app.use(express.static(path.join(__dirname, 'public/')));
app.use("/cv",express.static(path.join(__dirname, 'public/uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload());
app.use(compression());



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

