// The code below was strongly pulled from these resources: https://blog.logrocket.com/multer-nodejs-express-upload-file/?utm_source=chatgpt.com AND https://www.loginradius.com/blog/engineering/upload-files-with-node-and-multer  
// using multer to do profile picture component


// import libraries
var express = require('express'); // express framework
var router = express.Router(); // create a router instance
const multer = require("multer"); // multer for file uploads
const path = require("path"); // node.js path modules
let userModel = require('../models/user'); // import user model
let User = userModel.User; // extract user model

// defining upload directory
const uploadsDir = path.join(__dirname, '../../public/Uploads'); // this is where uploaded files will be saved

// multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // set folder wheer files will be stored
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // preserve file extension
    cb(null, Date.now() + ext); // give file a unique name using timestamp
  }
});

// create upload instance 
const upload = multer({ storage }); // configure multer with storage settings

router.post('/upload-profile', upload.single('profilePic'), async (req, res) => {
  try {
    // check if a file was uploaded
    if (!req.file) {
      console.log("No file uploaded");
      return res.redirect('/upload-profile'); // redirect if no file
    }

    // path to store in mongodb
    const imagePath = '/Uploads/' + req.file.filename;

    

     // Update user document in MongoDB (this is where the line goes)
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // current logged-in user
      { profileImage: imagePath },  // save the uploaded image path at root level
      { new: true } // return the updated
    );

    // Update the session copy of the user so EJS sees the new image immediately
    req.user.profileImage = updatedUser.profileImage;

    console.log("Upload successful:", imagePath);

    // redirect back to home or wherever desired
    res.redirect('/');
  } catch (err) {
    console.error(err); // log errors if they occur
    res.redirect('/upload-profile'); // redirect back on failure
  }
});

// export router
module.exports = router;

