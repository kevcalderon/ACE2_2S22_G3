const mysql = require('mysql2')

const mysqlConnection = mysql.createConnection({
    host: 'us-east.connect.psdb.cloud',
    user: '1vf6b8bubco7s3htxgwr',
    password: 'pscale_pw_dcB1nC6Rz8MF8sLSlbYC5EjYhBDfZUzNyFkyGNozM1w',
    database: 'db-ace2-p1',
    ssl: {
        rejectUnauthorized: false
    }
})

/*const mysqlConnection = mysql.createConnection({
    host: '34.134.19.82',
    user: 'root',
    password: 'root',
    database: 'dbBox'
})*/

/*const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'db-ace2-p1'
})*/

mysqlConnection.connect(function(err) {
    if(err) return console.log(err)
    console.log('Database is connected')
})

module.exports = mysqlConnection