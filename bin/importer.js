const MySQLConnector = require('../lib/mysql-connector');
const Parser = require('../lib/parser');

if(process.argv.length < 3) {
    console.log("Not enough arguments. node ./importer.js [file]");
    process.exit(1);
}

let conn = MySQLConnector.getInstance().conn;

let parsed = Parser.parseDaily(process.argv[2]);
for(let time_parsed of parsed) {
    conn.query('INSERT INTO statistics SET ?', time_parsed, function (e, v, f){
        if(e) {
            console.error("Failed to insert.");
            console.error(e);
        }
    });
}