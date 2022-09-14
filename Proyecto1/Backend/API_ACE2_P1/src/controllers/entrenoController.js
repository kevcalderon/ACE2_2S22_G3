const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

const momentTimezone = require('moment-timezone')   //Libreria utilizada para dar formato a la fecha y hora
momentTimezone().tz('America/Guatemala')

const crearEntreno = async (req, res) => {
    const {nombre, idUsuario} = req.body;

    const date = new Date()
    const fecha = momentTimezone(date.toISOString()).format('YYYY-MM-DD')
    const data = [{nombre, fecha, idUsuario}]

    mysqlConnection.query('INSERT INTO tipo_entreno SET ?', data, (err, rows) => {
        if(err){
            console.log(err)
            return res.json({message: 'error - crear entreno'})
        }
        res.json({message: 'entreno creado'})
    })

}

const obtenerEntrenos = async (req, res) => {
    const fechaInicial = req.params.fechaInicial
    const fechaFinal = req.params.fechaFinal
    const idUsuario = req.params.idUsuario
    const data = [idUsuario, fechaInicial, fechaFinal]

    try {
        const response = await query(`SELECT * FROM tipo_entreno 
            WHERE idUsuario = ? AND fecha BETWEEN ? AND ?;`, data);

        let contFuerza = 0
        let contVelocidad = 0
        let contRitmo = 0
        response.forEach(entreno => {
            if(entreno.nombre == "fuerza") contFuerza += 1
            else if(entreno.nombre == "velocidad") contVelocidad += 1
            else if(entreno.nombre == "ritmo") contRitmo += 1
        })

        const horaInicialPorFecha = await query(`SELECT MIN(hora) as horaInicial, fecha FROM datos_sensor 
            WHERE idUsuario = ? AND fecha BETWEEN ? AND ? GROUP BY fecha;`, data);
        const horaFinalPorFecha = await query(`SELECT MAX(hora) as horaFinal, fecha FROM datos_sensor 
            WHERE idUsuario = ? AND fecha BETWEEN ? AND ? GROUP BY fecha;`, data);

        let totalEntreno = 0
        for(let i = 0; i < horaInicialPorFecha.length; i++){
            totalEntreno += horaFinalPorFecha[i].horaFinal - horaInicialPorFecha[i].horaInicial
        }

        const entrenos = {
            fuerza: contFuerza,
            velocidad: contVelocidad,
            ritmo: contRitmo,
            total: response.length,
            tiempo: totalEntreno.toFixed(2).replace('.', ':')
        }
        res.json(entrenos)
        
    } catch(err) {
        console.log(err)
        res.json({message: 'error - obtener entrenos'})
        //mysqlConnection.end();
    }

}

module.exports = {
    crearEntreno,
    obtenerEntrenos
}