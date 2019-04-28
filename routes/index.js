const express = require('express');
const MySQLConnector = require('../lib/mysql-connector');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({app: 'WeatherPI V1.0'});
});

router.get('/get_data', function(req, res, next) {
    if(req.query.start_time === undefined) {
        res.json({error: "start_time is a required parameter"});
    } else {
        let conn = MySQLConnector.getInstance().conn;
        conn.query("SELECT * FROM", function(error, results, fields));
        res.json({start_time: req.query.start_time, end_time: req.query.end_time});
    }
});

module.exports = router;
