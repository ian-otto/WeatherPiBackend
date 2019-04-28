const mysql = require('mysql');
const fs = require('fs');
class MySQLConnector {
    static getInstance() {
        if(MySQLConnector.instance === undefined) {
            MySQLConnector.instance = new MySQLConnector();
        }
        return MySQLConnector.instance;
    }

    constructor() {
        this._config = JSON.parse(fs.readFileSync(__dirname + '/../config/config.json').toString("utf8"));
        this.conn = mysql.createConnection(this._config);
        this.conn.connect();
    }
}


module.exports = MySQLConnector;