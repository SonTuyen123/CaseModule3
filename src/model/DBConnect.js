const mysql = require('mysql')
class DBConnect {
    host;
    port;
    user;
    database;
    password
    constructor() {
        this.host = 'localhost';
        this.port = 3306;
        this.database = 'case2';
        this.user = 'root';
        this.password = '123456'
    }

    connect() {
        return mysql.createConnection({
            host: this.host,
            database: this.database,
            port: this.port,
            user: this.user,
            password: this.password
        })
    }
}

module.exports = DBConnect;
