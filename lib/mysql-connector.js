const mysql = require('mysql');

class MySQLConnector {
    static getInstance() {
        if(MySQLConnector.instance === undefined) {
            MySQLConnector.instance = new MySQLConnector();
        }
        return MySQLConnector.instance;
    }

    constructor() {
        this._config = JSON.parse(fs.readFileSync(__dirname + '/../config.json'));
        this.conn = mysql.createConnection(this._config);
        this.conn.connect();
    }
}


module.exports = MySQLConnector;