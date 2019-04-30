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
        let latestDate = req.query.end_date === undefined ? new Date() : req.query.end_date;
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

router.get('/previous_week', function (req, res, next) {
    MySQLConnector.getInstance().conn
        .query("SELECT temperature AS current_temp, daily_rain AS rain_count," +
            " wind_dir AS wind_direction, wind_speed, DATE(`timecode`) AS date" +
            " FROM statistics ORDER BY timecode DESC LIMIT 1", function (e, r, f) {
            if(e) {
                console.error(e);
                res.status(500);
                res.json({error: "mysql error"});
                return;
            }
            MySQLConnector.getInstance().conn
                .query("SELECT DATE(timecode) the_date, MAX(temperature) AS high_temp, MIN(temperature) " +
                    "AS low_temp FROM statistics GROUP BY the_date ORDER BY the_date DESC LIMIT 5", function (e, r2, f) {
                    if(e) {
                        console.error(e);
                        res.status(500);
                        res.json({error: "mysql error"});
                        return;
                    }
                    let data = {
                        today: r[0],
                        one: r2[0],
                        two: r2[1],
                        three: r2[2],
                        four: r2[3],
                        five: r2[4]
                    };
                    res.json(data);
                });
        });
});

module.exports = router;
