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
        let the_date = lines.shift();
        lines.shift();
        lines.shift();


        for(let line of lines) {
            let splLine = line.split(/[\s]+/);
            //Time         Wind Dir   Wind Spd  Wind Gust   Humidity       Temp   Tot Rain Wind Chill Heat Index  Dew Point   Barom SL  DailyRain   HourRain   RainRate
            let data = {
                date: the_date,
                time: splLine[0],
                windDir: splLine[1],
                windSpd: splLine[2],
                windGust: splLine[3],
                humidity: splLine[4],
                temp: splLine[5],
                totRain: splLine[6],
                windChill: splLine[7],
                heatIndex: splLine[8],
                dewPoint: splLine[9],
                barometer: splLine[10],
                dailyRain: splLine[11],
                hourRain: splLine[12],
                rainRate: splLine[13]
            };

            rainArray.push(data);
        }
        return rainArray;
    }
}

module.exports = Parser;