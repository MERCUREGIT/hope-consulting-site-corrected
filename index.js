const express = require('express');
const app = express();
const path = require('path');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://hopetest:1234@cluster0.mcou4.mongodb.net/cms?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
    console.log("MONGO CONNECTED");
}).catch(error => console.log(error));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(upload());

// method override
app.use(methodOverride('_method'));



const { select, generateTime } = require('./helpers/handlebars-helpers');



// load engines
app.engine('handlebars', exphbs({
    defaultLayout: 'home',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: { select: select, generateTime: generateTime }
}));
app.set('view engine', 'handlebars');

app.use(session({
    secret: 'heckmack123',
    resave: true,
    saveUninitialized: true,

}));

app.use(flash());

//pasport
app.use(passport.initialize());
app.use(passport.session());


// local variables using middleware
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.user = req.user || null;
    next();
})

// load routes
const home = require('./routes/home/index');
// const admin = require('./routes/admin/index');
// const posts = require('./routes/admin/post');
// const categories = require('./routes/admin/categories');
// const comments = require('./routes/admin/comments');


// Use routes
app.use('/', home);
// app.use('/admin', admin);
// app.use('/admin/posts', posts);
// app.use('/admin/categories', categories);
// app.use('/admin/comments', comments);
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Listening on port ${8000}`);
});