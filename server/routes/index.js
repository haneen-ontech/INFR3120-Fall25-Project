var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

module.exports = router;

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

module.exports = router;

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

module.exports = router;

router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products' });
});

module.exports = router;

router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' });
});

module.exports = router;

router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'Contact us' });
});

/*
MVC
Model --> to connect our logic
View --> pages
Controller --> logic behind routes
*/

module.exports = router;
