var express = require('express');
var router = express.Router();

/* GET home page with / */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Diamond Auto Insurance' });
});

/* GET home page with /home */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Diamond Auto Insurance' });
});

/* GET about us page */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

/* GET contact us page */
router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'Contact' });
});


module.exports = router;
