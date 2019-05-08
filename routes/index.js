const express = require('express');
const MySQLConnector = require('../lib/mysql-connector');
const router = express.Router();
const moment = require('moment');

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
        conn.query("SELECT * FROM statistics WHERE timecode >= ? AND timecode <= ? ORDER BY timecode DESC LIMIT 2000",
            [moment(req.query.start_date).format('YYYY-MM-DD HH:mm:ss'),
                moment(latestDate).format('YYYY-MM-DD HH:mm:ss')], function(error, results, fields) {
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
            " wind_dir AS wind_direction, wind_speed, DATE(`timecode`) AS the_date" +
            " FROM statistics ORDER BY timecode DESC LIMIT 1", function (e, r, f) {
            if(e) {
                console.error(e);
                res.status(500);
                res.json({error: "mysql error"});
                return;
            }
            MySQLConnector.getInstance().conn
                .query("SELECT DATE(timecode) the_date, MAX(temperature) AS high_temp, MIN(temperature) " +
                    "AS low_temp FROM statistics GROUP BY the_date ORDER BY the_date " +
                    "DESC LIMIT 6", function (e, r2, f) {
                    if(e) {
                        console.error(e);
                        res.status(500);
                        res.json({error: "mysql error"});
                        return;
                    }
                    r[0].the_date = moment(r[0].the_date).format("D MMM");
                    for(let result of r2) {
                        result.the_date = moment(result.the_date).format("dddd");
                    }
                    let data = {
                        today: r[0],
                        "1": r2[1],
                        "2": r2[2],
                        "3": r2[3],
                        "4": r2[4],
                        "5": r2[5]
                    };
                    res.json(data);
                });
        });
});

module.exports = router;
