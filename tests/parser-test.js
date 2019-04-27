const assert = require('assert');
const fs = require('fs');
const Parser = require('../lib/parser');

describe('Parser', function() {
    describe('#parseDaily(filename)', function() {
        let parsed = Parser.parseDaily(fs.openSync(__dirname + '/test-files/daily.txt', 'r'));
        it('should return a array of objects', function() {
            assert.strictEqual(Array.isArray(parsed), true, "parsed is not an array");
            assert.strictEqual(typeof parsed[0], "object", "parsed[0] is not an object");
        });
        it('should successfully parse a valid file', function () {
            assert.deepEqual(parsed[0], {
                time: '12:00am',
                windDir: '9',
                windSpd: '2',
                windGust: '3',
                humidity: '31',
                temp: '50.9',
                totRain: '8.35',
                windChill: '50.9',
                heatIndex: '50.2',
                dewPoint: '21.4',
                barometer: '23.58',
                dailyRain: '0.00',
                hourRain: '0.00',
                rainRate: '0.000' });
        });
    });
});