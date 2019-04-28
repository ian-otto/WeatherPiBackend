const fs = require("fs");

class Parser {
    /**
     * Parse the daily.txt file, which is TSV as far as I know.
     * @param file A file descriptor
     */
    static parseDaily(file) {
        let contents = fs.readFileSync(file).toString("latin1");
        let lines = contents.split('\n');
        let rainArray = [];

        //cut the date and the headers lines
        let the_date = lines.shift().replace('\r', '');
        lines.shift();
        lines.shift();

        for(let line of lines) {
            let splLine = line.split(/[\s]+/);
            //Time         Wind Dir   Wind Spd  Wind Gust   Humidity       Temp   Tot Rain Wind Chill Heat Index  Dew Point   Barom SL  DailyRain   HourRain   RainRate
            let data = {
                timecode: require('moment')(the_date + " " + splLine[0], "M/DD/YY hh:mma")
                    .format('YYYY-MM-DD HH:mm:ss'),
                wind_dir: splLine[1],
                wind_speed: splLine[2],
                wind_gust: splLine[3],
                humidity: splLine[4],
                temperature: splLine[5],
                total_rain: splLine[6],
                wind_chill: splLine[7],
                heat_index: splLine[8],
                dew_point: splLine[9],
                barometer: splLine[10],
                daily_rain: splLine[11],
                hourly_rain: splLine[12],
                rain_rate: splLine[13]
            };

            rainArray.push(data);
        }
        return rainArray;
    }
}

module.exports = Parser;