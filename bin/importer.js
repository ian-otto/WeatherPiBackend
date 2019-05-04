const MySQLConnector = require('../lib/mysql-connector');
const Parser = require('../lib/parser');

if(process.argv.length < 3) {
    console.log("Not enough arguments. node ./importer.js [file]");
    process.exit(1);
}

let conn = MySQLConnector.getInstance().conn;

let parsed = Parser.parseDaily(process.argv[2]);
for(let parsed_single = 0; parsed_single < parsed.length; parsed_single++) {

    conn.query('INSERT IGNORE INTO statistics SET ?', parsed[parsed_single], function (e, v, f) {
        if (e) {
            console.error("Failed to insert.");
            console.error(e);
        }
        if((parsed_single + 1) === parsed.length) {
            conn.end();
        }
    });
}