/*
 * Import Module
 ****************/
const express = require('express');
const exphbs = require('express-handlebars'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');
const {stripTags} = require('./helpers/hbs')
const port = 3000

/*
 * Import Controller
 *******************/
// article
const articleSingleController = require('./controllers/articleSingle')
const articleAddController = require('./controllers/articleAdd.js')
const articlePostController = require('./controllers/articlePost')
const articleEdit = require('./controllers/articleEdit')
const articleUpdate = require('./controllers/articleUpdate')
const contact = require('./controllers/contact')
const homePage = require('./controllers/homepage')


// user
const userCreate = require('./controllers/user/userCreate')
const userRegister = require('./controllers/user/userRegister')
const userLogin = require('./controllers/user/userLogin')
const userLoginAuth = require('./controllers/user/userLoginAuth')
const userLogout = require('./controllers/user/userLogout')


const app = express();


// Mongoose
//const urlDB = 'mongodb://localhost:27017/blog'
const urlDB = 'mongodb+srv://Apache:Apache@cluster0-7fj8c.mongodb.net/test?retryWrites=true&w=majority'
mongoose
    .connect( urlDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });

const mongoStore = MongoStore(expressSession);

app.use(connectFlash())

app.use(expressSession ({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(
        {mongooseConnection: mongoose.connection}
    )
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(fileupload())

const auth = require('./middleware/auth');
const redirectAuthSucess = require('./middleware/redirectAuthSucess');


var handlebars = require('handlebars')
var momentHandler = require('handlebars.moment')
momentHandler.registerHelpers(handlebars);


app.use(express.static('public'));

// Route
app.engine('hbs', exphbs({
    extname: 'hbs',
    helpers: {
        stripTags: stripTags
    },
    
    defaultLayout: 'main'
 }));
app.set('view engine', 'hbs');

app.use('*', (req, res, next) => {
    const sess = req.session
    res.locals.user = req.session.userId;
    next ()
})

// Middleware
const articleValidPost = require('./middleware/articleValidPost')
app.use("/articles/post", articleValidPost)
app.use('/articles/add', auth )


app.get("/", homePage)


//ARTICLES
app.get("/articles/add", auth, articleAddController )
app.get("/articles/:id", articleSingleController )
app.post("/articles/post", auth, articleValidPost, articlePostController )
app.get("/article/edit/:id", auth, articleEdit )
app.post("/article/update/:id", articleUpdate )


// User
app.get('/user/create', redirectAuthSucess, userCreate )
app.post('/user/register', redirectAuthSucess, userRegister )
app.get('/user/login', redirectAuthSucess, userLogin )
app.post('/user/loginAuth', redirectAuthSucess, userLoginAuth )
app.get('/user/logout', userLogout)

// Contact

app.get("/contact", contact )

app.use( (req, res) => {
    res.render('error404')
})

app.listen(port, function () {
    console.log("Le serveur tourne sur le port : " + port);
})