const mysql = require('mysql2')

const mysqlConnection = mysql.createConnection({
    host: 'us-east.connect.psdb.cloud',
    user: 'auy8gndgoaubhsqk14y4',
    password: 'pscale_pw_EtbptIrMP7V0PhgDdKgTcrcZJwr7V9MVUeC40t0Jc3E',
    database: 'db-ace2',
    ssl: {
        rejectUnauthorized: false
    }
})

mysqlConnection.connect(function(err) {
    if(err) return console.log(err)
    console.log('Database PlanetScale is connected')
})

module.exports = mysqlConnection

//Database Google Cloud
/*host: 34.132.8.208
user: root
contra: IX`pq=e=~a.ytKBM
db: arduino*/