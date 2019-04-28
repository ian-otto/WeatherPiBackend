const express = require('express');
const MySQLConnector = require('../lib/mysql-connector');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({app: 'WeatherPI V1.0'});
});

router.get('/get_data', function(req, res, next) {
    if(req.query.start_date === undefined) {
        res.json({error: "start_date is a required parameter"});
    } else {
        let latestDate = req.query.end_date === undefined ? new Date().toISOString() : req.query.end_date;
        let conn = MySQLConnector.getInstance().conn;
        conn.query("SELECT * FROM statistics WHERE timecode >= ? AND timecode <= ?",
            [require('moment')(req.query.start_date).format('YYYY-MM-DD HH:mm:ss'),
                require('moment')(latestDate).format('YYYY-MM-DD HH:mm:ss')], function(error, results, fields) {
            if(error) {
                res.code(500);
                console.error(error);
                res.json({error: "MySQL service down."});
                return;
            }
            res.json(results);
        });
    }
});

module.exports = router;
