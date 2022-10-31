const mysqlConnectionPlanetScale = require('../database/db')
const util = require('util');
const queryPS = util.promisify(mysqlConnectionPlanetScale.query).bind(mysqlConnectionPlanetScale);

const momentTimezone = require('moment-timezone')   //Libreria utilizada para dar formato a la fecha y hora
momentTimezone().tz('America/Guatemala')

const mysql = require('mysql2')
const mysqlConnectionGC = mysql.createConnection({
    host: '35.184.45.255',
    user: 'root',
    password: '2CXA2)`{FyvcmfE1',
    database: 'sensorTMP'
})
mysqlConnectionGC.connect(function(err) {
    if(err) return console.log(err)
    console.log('Database GC is connected')
})
const queryGC = util.promisify(mysqlConnectionGC.query).bind(mysqlConnectionGC);


const obtenerDatosSensor = async (req, res) => {
    const idEntreno = req.params.idEntreno

    /*const fuerzaImpulsoInicial = Math.floor(Math.random() * 50);
    const fuerzaImpulsoFinal = Math.floor(Math.random() * 50);
    const velocidadImpulso = Math.floor(Math.random() * 100);
    //const ritmo = Math.floor(Math.random() * 100);
    const calorias = Math.floor(Math.random() * 25);
    const peso = Math.floor(Math.random() * 75);*/

    let fuerzaImpulsoInicial = 0
    let fuerzaImpulsoFinal = 0
    let velocidadImpulso = 0
    let calorias = 0
    let peso = 0
    let ritmo = 0

    try {
        const resDatosSensor = await queryGC('SELECT fuerzaImpulsoInicial, fuerzaImpulsoFinal, velocidadImpulso, peso FROM sensorTemp;');
        console.log('sensorTemp', resDatosSensor)
        
        fuerzaImpulsoInicial = resDatosSensor[0].fuerzaImpulsoInicial
        fuerzaImpulsoFinal = resDatosSensor[0].fuerzaImpulsoFinal
        velocidadImpulso = resDatosSensor[0].velocidadImpulso
        peso = resDatosSensor[0].peso
        ritmo = (velocidadImpulso / 60) * 100
        const resCaloriasImpulsoFinal = await queryPS(`SELECT calorias, fuerzaImpulsoFinal FROM datosSensor WHERE idEntreno=${idEntreno} ORDER BY idDatosSensor DESC LIMIT 1;`);
        
        if(resCaloriasImpulsoFinal.length > 0) calorias = parseFloat(resCaloriasImpulsoFinal[0].calorias)

        if(resCaloriasImpulsoFinal.length > 0 && (resCaloriasImpulsoFinal[0].fuerzaImpulsoFinal !== 0) ){
            console.log('fuerzaImpulsoFinal', resCaloriasImpulsoFinal[0].fuerzaImpulsoFinal)
            //calorias += 0.26
            calorias += 0.16
        }
        //CALORIAS -> 8 - 10 calorias por 1min -> persona promedio 25 -30 saltos en 1min -> 8/30 = 0.26 calorias por salto

    } catch(err){
        console.log(err)
    }

    await queryPS("SET time_zone = 'America/Guatemala';");
    const resFechaHora = await queryPS('SELECT NOW() as fechaFull;');
    const fecha = momentTimezone(resFechaHora[0].fechaFull).format('YYYY-MM-DD')
    const hora = momentTimezone(resFechaHora[0].fechaFull).format('HH.mm')

    const data = [{fecha, hora, fuerzaImpulsoInicial, fuerzaImpulsoFinal, velocidadImpulso, ritmo, calorias, peso, idEntreno}]
    console.log(data)

    await queryPS('INSERT INTO datosSensor SET ?', data);
    //const resIdDatosSensor = await queryPS('SELECT LAST_INSERT_ID() AS idDatosSensor;');

    /*mysqlConnectionPlanetScale.query('INSERT INTO datoSensor SET ?', data, (err, rows) => {
        if(err){
            console.log(err)
        }
    })
    const resIdDatosSensor = await queryPS('SELECT LAST_INSERT_ID() AS idDatosSensor;');*/

    res.json({fuerzaImpulsoInicial, fuerzaImpulsoFinal, velocidadImpulso, ritmo, calorias, peso})
    //res.json({fuerzaImpulsoInicial, fuerzaImpulsoFinal, velocidadImpulso, ritmo, calorias, peso, idDatosSensor: resIdDatosSensor[0].idDatosSensor})
}

const actualizarDatosSensor = async (req, res) => {
    const idDatosSensor = req.params.idDatosSensor
    const {ritmo} = req.body
    console.log(idDatosSensor, ritmo)
    await queryPS('UPDATE datosSensor SET ritmo = ? WHERE idDatosSensor = ?', [ritmo, idDatosSensor]);
    res.json({message: 'ritmo actualizado'})
}

module.exports = {
    obtenerDatosSensor,
    actualizarDatosSensor
}