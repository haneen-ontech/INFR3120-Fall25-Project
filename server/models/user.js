// importing libraries/collections required

// import specific fucntions from jQuery
const {trim, type } = require('jquery')
// import mongoose for mongodb schema modeling
let mongoose = require('mongoose');
// import passport-local-mongoose plugin for handling authentication
let passportLocalMongoose = require('passport-local-mongoose');
// import record collection 
const { collection } = require('./record');

// making our user schema
let User = mongoose.Schema({

    // username field for authentication
    username: 
    {
        type:String, // must be a string
        default:"", // default empty string
        trim:true, // remove whitespace from ends
        required:"Username is required" // validation message if missing
    },
    
    // password field which will be handled by passport-local-mongoose
    password: 
    {
        type:String, 
        default:"",
        trim:true,
        required:"Password is required"
    },

    // email field 
    email: 
    {
        type:String, 
        default:"",
        trim:true,
        required:"Email is required"
    },

    // display name field
    displayName: 
    {
        type:String, 
        default:"",
        trim:true,
        required:"displayName is required"
    },

    // timestamp for when the user was created in database
    created: 
    {
        type:Date, 
        default:Date.now,
    },

    // timestamp for the last update
    updated: 
    {
        type:Date, 
        default:Date.now,
    },
},
{
    // specifying mongoose collection name
    collection:'user'
}
)

// using options to customize passport-local-mongoose behaviour
let options = ({MissingPasswordError:'Wrong/Missing Password'});

// adding passport-local-mongoose plugin to the schema which adds authentication methods
User.plugin(passportLocalMongoose, options);

// exporting the user model
module.exports.User = mongoose.model('User', User);