var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({app: 'WeatherPI V1.0'});
});

module.exports = router;
