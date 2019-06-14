const express = require("express")
const http = require('http')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const validator = require("express-validator")
const passport = require('passport')
const MongoDBStore = require('connect-mongo')(session)
const path = require("path")
const util = require('./util/database')
const flash = require("connect-flash")
const multer = require('multer')
const {Users} = require('./helpers/Users')

//init express app
const app = express()

//create server
const server = http.createServer(app)

//socket setup
const io = require('socket.io')(server)
 //initialize socket
 require('./socket/groupchat')(io, Users)
 require('./socket/friend')(io)


//bodyparser
app.use(bodyParser.urlencoded({ extended: true}));
//multer
// app.use(multer().single('upload1'))
//user module
const userRoutes = require('./routes/user')
//admin module
const adminRoutes = require('./routes/admin')
//home routes
const homeRoutes = require('./routes/home')
//group routes
const groupRoutes = require('./routes/group')


//multer
// app.use(multer().single('upload'))

//static files
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
    secret: 'its a secret key',
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({ mongooseConnection: mongoose.connection }),
    cookie : {
      maxAge: 1000* 60 * 60 *24 * 365
  },
}))

 // initialize passport
 require('./config/passport-setup')(app);



//init flash
app.use(flash());

//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash(('success_msg'))
    res.locals.errors_msg = req.flash(('errors_msg'))
    res.locals.error = req.flash(('error'))
    next()
})

//view engine
app.set('view engine', 'ejs')



//set routes
app.use(userRoutes)
app.use(adminRoutes)
app.use(homeRoutes)
app.use(groupRoutes)

//mongodb connection with mongoose
mongoose.connect(util.database, { useFindAndModify: false });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    server.listen(3000, () => console.log('nodejs server started'));
    console.log('Connected to MongoDB');
});


