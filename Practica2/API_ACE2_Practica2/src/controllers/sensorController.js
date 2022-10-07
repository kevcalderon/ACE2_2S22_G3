const mysqlConnectionPlanetScale = require('../database/db')
const util = require('util');
const queryPS = util.promisify(mysqlConnectionPlanetScale.query).bind(mysqlConnectionPlanetScale);

const momentTimezone = require('moment-timezone')   //Libreria utilizada para dar formato a la fecha y hora
momentTimezone().tz('America/Guatemala')

const mysql = require('mysql2')
const mysqlConnectionGC = mysql.createConnection({
    host: '34.132.8.208',
    user: 'root',
    password: 'IX`pq=e=~a.ytKBM',
    database: 'arduino'
})
mysqlConnectionGC.connect(function(err) {
    if(err) return console.log(err)
    console.log('Database GC is connected')
})
const queryGC = util.promisify(mysqlConnectionGC.query).bind(mysqlConnectionGC);

const obtenerDatosSensor = async (req, res) => {
    const idEntreno = req.params.idEntreno

    /*const pulso = Math.floor(Math.random() * 100);
    const rangoDistancia = Math.floor(Math.random() * 100);
    const frecuenciaRepeticion = Math.floor(Math.random() * 100);
    const numRepeticiones = Math.floor(Math.random() * 10);
    const calorias = Math.floor(Math.random() * 25);*/

    let pulso = 0
    let rangoDistancia = 0
    let frecuenciaRepeticion = 0
    let numRepeticiones = 0
    let calorias = 0

    try {
        const resDatosSensor = await queryGC('SELECT pulso, rango_distancia, frecuencia_repeticion, num_repeticiones FROM temp;');
        console.log('temporal_sensor', resDatosSensor)
        
        pulso = resDatosSensor[0].pulso
        rangoDistancia = resDatosSensor[0].rango_distancia
        frecuenciaRepeticion = resDatosSensor[0].frecuencia_repeticion
        numRepeticiones = resDatosSensor[0].num_repeticiones
        const resCalorias = await queryPS(`SELECT calorias FROM datos_sensor WHERE idEntreno=${idEntreno} ORDER BY idSensor DESC LIMIT 1;`);
        //if(resCalorias.length > 0) calorias = parseFloat(resCalorias[0].calorias) + 0.13
        if(resCalorias.length > 0) calorias = parseFloat(resCalorias[0].calorias)

        const resNumReps = await queryPS(`SELECT numRepeticiones FROM datos_sensor WHERE idEntreno=${idEntreno} ORDER BY idSensor DESC LIMIT 2;`);
        if(resNumReps.length > 1 && (resNumReps[0].numRepeticiones !== resNumReps[1].numRepeticiones) ){
            console.log('resNumReps', resNumReps[0].numRepeticiones, resNumReps[1].numRepeticiones)
            calorias += 0.23
        }
        //CALORIAS -> 7 calorias por 1min -> persona promedio 30 flexiones en 1min -> 0.23 calorias por flexión

    } catch(err){
        console.log(err)
    }

    await queryPS("SET time_zone = 'America/Guatemala';");
    const resFechaHora = await queryPS('SELECT NOW() as fechaFull;');
    const fecha = momentTimezone(resFechaHora[0].fechaFull).format('YYYY-MM-DD')
    const hora = momentTimezone(resFechaHora[0].fechaFull).format('HH.mm')

    const data = [{fecha, hora, pulso, rangoDistancia, frecuenciaRepeticion, numRepeticiones, calorias, idEntreno}]
    console.log(data)

    mysqlConnectionPlanetScale.query('INSERT INTO datos_sensor SET ?', data, (err, rows) => {
        if(err){
            console.log(err)
        }
    })

    res.json({pulso, rangoDistancia, frecuenciaRepeticion, numRepeticiones, calorias})
}

module.exports = {
    obtenerDatosSensor
}