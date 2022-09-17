const mysqlConnection = require('../database/db')

const momentTimezone = require('moment-timezone')   //Libreria utilizada para dar formato a la fecha y hora
momentTimezone().tz('America/Guatemala')


const obtenerDatosSensor = async (req, res) => {
    const idUsuario = req.params.idUsuario

    const fuerzaGolpe = Math.floor(Math.random() * 100);
    const velocidad = Math.floor(Math.random() * 100);
    const porcentajeRitmo = Math.floor(Math.random() * 100);

    const date = new Date()
    const fecha = momentTimezone(date.toISOString()).format('YYYY-MM-DD')
    const hora = momentTimezone(date.toISOString()).format('HH.mm')

    const data = [{fecha, hora, fuerzaGolpe, velocidad, porcentajeRitmo, idUsuario}]

    mysqlConnection.query('INSERT INTO datos_sensor SET ?', data, (err, rows) => {
        if(err){
            console.log(err)
            return res.json({message: 'error - obtener datos sensor'})
        }
        res.json({fuerzaGolpe, velocidad, porcentajeRitmo})
    })
}

module.exports = {
    obtenerDatosSensor
}