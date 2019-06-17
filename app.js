const express = require("express")
const fs = require('fs')
const http = require('http')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const validator = require("express-validator")
const passport = require('passport')
const MongoDBStore = require('connect-mongo')(session)
const path = require("path")
const flash = require("connect-flash")
const {Users} = require('./helpers/Users')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')

//mongodb uri
const MONGODB_URI = 'mongodb://punkuz:ait12ise045@express-cluster-shard-00-00-zfnce.mongodb.net:27017,express-cluster-shard-00-01-zfnce.mongodb.net:27017,express-cluster-shard-00-02-zfnce.mongodb.net:27017/express-chat?ssl=true&replicaSet=express-cluster-shard-0&authSource=admin&retryWrites=true&w=majority'

//logging
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

//init express app
const app = express()

//helmet
app.use(helmet())
//compression
app.use(compression())

//morgan
app.use(morgan('combined', {stream: logStream}))

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


//static files
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
    secret: 'its a secret key',
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        url: MONGODB_URI,
        collection: 'sessions'
    }),
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
mongoose.connect(MONGODB_URI)
.then(result => {
    server.listen(process.env.PORT || 3000, () => console.log('nodejs server started'));
})
.catch(err=> console.log(err))

