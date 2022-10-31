const mysql = require('mysql2')

const mysqlConnection = mysql.createConnection({
    host: 'us-east.connect.psdb.cloud',
    user: '3nq2r3grtj1cnpoxnbor',
    password: 'pscale_pw_RGENufRhxWwsaq3wQG3GRF5dLBBO4ylSUOW8e4swbXg',
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


/*host: 35.184.45.255
user:root
contra: 2CXA2)`{FyvcmfE1
db: sensorTMP*/