var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/presenter', function(req, res, next) {
  res.render('index', { presenter: true });
})

module.exports = router;
