// load environment variables from .env file
var dotenv = require('dotenv').config(); 

// import modules and libraries needed for website
var createError = require('http-errors'); // for 404 and other errors
var express = require('express'); // express framework
var path = require('path'); // for file and directory paths
var cookieParser = require('cookie-parser'); // parse cookies
var logger = require('morgan'); // http request logger 
let mongoose = require('mongoose'); // mongodb mongoose library
let DB = require('./db') // database configuration

// adding libraries for authentication
let session = require('express-session'); // creating variable for session management 
let passport = require('passport'); // passport authentication
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash'); // flash messages
let cors = require('cors'); // cross origin resource
var app = express(); // create express app instance 

// import user model
let userModel = require('../models/user');
let User = userModel.User;

// test db connection
mongoose.connect(DB.mongoURI);
let mongoDB = mongoose.connection; 
// error handling for db
mongoDB.on('error', console.error.bind(console, 'Connection error'));
// success message on db connection
mongoDB.once('open', ()=>{
  console.log('Connected to the MongoDB');
  console.log(mongoose.connection.db.databaseName);
})

// set up express session

// configuring express session middleware
app.use(session({
  secret:"Somesecret",
  saveUninitialized: false,
  resave: false
}))

// initialize flash 
app.use(flash());

// configure passport authentication strategy using User model
passport.use(User.createStrategy());

// serialize and deserialize the user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// initialize the passport middleware
app.use(passport.initialize());
app.use(passport.session());


// make req.user and displayName available in all views
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.displayName = req.user ? req.user.displayName : "";
    next();
});

// setting needed imported routes
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var recordsRouter = require('../routes/record')

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


// middleware
app.use(logger('dev')); // logger for requests
app.use(express.json()); // parse json requests
app.use(express.urlencoded({ extended: false })); // parse url-encoded requests
app.use(cookieParser()); // parse cookies

// serve static files 
app.use(express.static(path.join(__dirname, '../../public')));
app.use('/Uploads', express.static(path.join(__dirname, '../../public/Uploads')));
app.use(express.static(path.join(__dirname, '../../node_modules')));


// route handlers 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// generic error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title:'Error'});
});

// export app for use in server
module.exports = app;
