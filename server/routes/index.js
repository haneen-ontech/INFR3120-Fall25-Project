// import express, passport, database configurations
var express = require('express');
var router = express.Router();
const passport = require('passport');
let DB = require('../config/db');

// ROUTES FOR STATIC PAGES

// importing our user model
let userModel = require('../models/user');
let User = userModel.User;

/* GET home page with / */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Diamond Auto Insurance', 
    displayName: req.user?req.user.displayName:""
  });
});

/* GET home page with /home */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Diamond Auto Insurance', displayName: req.user?req.user.displayName:"" });
});

/* GET about us page */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', displayName: req.user?req.user.displayName:"" });
});

/* GET contact us page */
router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'Contact', displayName: req.user?req.user.displayName:"" });
});

// ROUTES FOR LOGIN PAGES

/* GET method for login*/
router.get('/login', function(req, res, next){
  // if no user is logged in, show login form
  if(!req.user)
  {
    res.render('auth/login', 
      {
        title:'Login',
        message: req.flash('loginMessage') // display flash message if exists 
      }
    )
  }
  else
  {
    // if user already logged in, redirect to home
    return res.redirect("/")
  }
});

/* POST method for login*/
router.post('/login', function(req, res, next){
  // use passport's local authentication strategy
  passport.authenticate('local', (err, user, info)=>{
    if(err)
      // handle server or strategy errors
    {
      return next(err);
    }
    if(!user)
    {
      // if authentication failes
      req.flash('loginMessage', 'AuthenticationError');
      return res.redirect('/login');
    }

    // if login successful, log user into the session
    req.login(user, (err)=>{
      if(err)
      {
        return next(err);
      }

      // redirect to records page after login success
      return res.redirect('/records')
    })
  })(req, res, next)
});


// ROUTES FOR REGISTRATION PAGES 

/* GET method for registration*/
router.get('/register', function(req, res, next){
    if(!req.user)
  {
    res.render('auth/register', 
      {
        title:'Register',
        message: req.flash('registerMessage')
      }
    )
  }
  else
  {
    // if already logged in, redirect away
    return res.redirect("/")
  }
});

/* POST method for registration*/
router.post('/register', function(req, res, next){
  
  // create new user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password,
    email:req.body.email,
    displayName: req.body.displayName
  })

  // register user using passport-local-mongoose
  User.register(newUser, req.body.password, (err)=>{
    if(err)
    {
      console.log("Error:Inserting the new user");

      // if user already exists 
      if(err.name=="UserExistingError")
      {
        req.flash('registerMessage', 'Registration Error: User already exists');
      }

      // re-render registration with error message
      return res.render('auth/register',
        {
          title:'Register',
          message: req.flash('registerMessage')
        }
      )
    }
    else{

      // auto-login user after registration
      return passport.authenticate('local')(req, res, ()=>{
        res.redirect('/records');
      })
    }
  })
});


// LOGOUT ROUTE

router.get('/logout', function(req, res, next){

  // passport logout function
  req.logout(function(err)
{
  if(err)
  {
    return next(err)
  }
})

// redirect back to home page after logout
res.redirect('/')
});

// export router for use in app.js
module.exports = router;
