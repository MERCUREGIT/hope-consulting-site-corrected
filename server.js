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
const logger = require('./config/winston');
const corsOptions = require('./config/whitelistedAddress')

require("./config/database")(mongoose).catch(error => console.log(error));
// app.use(helmet());

app.use(express.static(path.join(__dirname, 'public/')));
app.use("/uploads/",express.static(path.join(__dirname, 'public/uploads/')));
app.use("/cv",express.static(path.join(__dirname, 'public/uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload());
app.use(compression());
// app.use(cors(corsOptions));
app.use(morgan('combined', { stream: logger.stream.write }));
app.use(methodOverride('_method'));


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['https://hope-consulting-admin.netlify.app','https://hope-consulting-admin.netlify.app/', "https://www.hope-consulting-cm.com","https://www.hope-consulting-cm.com/" ]);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const { select, generateTime, shortenText, paginate } = require('./helpers/handlebars-helpers');
app.engine('handlebars', exphbs({
    defaultLayout: 'home',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: { select: select, generateTime: generateTime, shortenText:shortenText, paginate:paginate }
}));
app.set('view engine', 'handlebars');

const home = require('./routes/home/index');
const admin = require('./routes/admin/index');

// Use routes
app.use('/', home);
app.use('/admin', admin);

module.exports = app;


