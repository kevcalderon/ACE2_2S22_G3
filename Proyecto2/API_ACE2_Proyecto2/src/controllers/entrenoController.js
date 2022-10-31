const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

const momentTimezone = require('moment-timezone')   //Libreria utilizada para dar formato a la fecha y hora

const crearEntreno = async (req, res) => {
    const {idUsuario, idTipoEntreno} = req.body;

    await query("SET time_zone = 'America/Guatemala';");
    const resFecha = await query('SELECT CURDATE() as fecha;');
    const fecha = momentTimezone(resFecha[0].fecha).format('YYYY-MM-DD')

    const data = [{fecha, idUsuario, idTipoEntreno}]

    try {
        await query('INSERT INTO entreno SET ?', data);
        const resIdEntreno = await query('SELECT LAST_INSERT_ID() AS idEntreno;');
        res.json({message: 'entreno creado', idEntreno: resIdEntreno[0].idEntreno})
        
    } catch(err){
        console.log(err)
        res.json({message: 'error - crear entreno'})
    }
    
}


const obtenerConteoEntrenos = async (req, res) => {
    const fechaInicial = req.params.fechaInicial
    const fechaFinal = req.params.fechaFinal
    const idUsuario = req.params.idUsuario
    const data = [idUsuario, fechaInicial, fechaFinal]

    try{
        await query("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));")
        await query("SET sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';")
        
        const resTotalEntrenos = await query(`SELECT COUNT(*) AS totalEntrenos FROM entreno
            WHERE idUsuario = ? AND fecha BETWEEN ? AND ?;`, data);
        console.log('resTotalEntrenos', resTotalEntrenos)

        const resJumpOver = await query(`SELECT COUNT(*) AS jumpOver FROM entreno E
            INNER JOIN tipoEntreno TE ON E.idTipoEntreno = TE.idTipoEntreno
            WHERE E.idUsuario = ? AND E.fecha BETWEEN ? AND ? AND TE.nombre = "Jump Over";`, data);
        console.log('resJumpOver', resJumpOver)

        const resBoxJump = await query(`SELECT COUNT(*) AS boxJump FROM entreno E
            INNER JOIN tipoEntreno TE ON E.idTipoEntreno = TE.idTipoEntreno
            WHERE E.idUsuario = ? AND E.fecha BETWEEN ? AND ? AND TE.nombre = "Box Jump";`, data);
        console.log('resBoxJump', resBoxJump)

        const resStepUp = await query(`SELECT COUNT(*) AS stepUp FROM entreno E
            INNER JOIN tipoEntreno TE ON E.idTipoEntreno = TE.idTipoEntreno
            WHERE E.idUsuario = ? AND E.fecha BETWEEN ? AND ? AND TE.nombre = "Step Up";`, data);
        console.log('resStepUp', resStepUp)


        const resHoraInicialPorEntreno = await query(`SELECT MIN(hora) as horaInicial FROM datosSensor DS
            INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
            WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ? 
            GROUP BY DS.idEntreno;`, data);
        console.log('resHoraInicialPorEntreno', resHoraInicialPorEntreno)

        const resHoraFinalPorEntreno = await query(`SELECT MAX(hora) as horaFinal FROM datosSensor DS
            INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
            WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ? 
            GROUP BY DS.idEntreno;`, data);
        console.log('resHoraFinalPorEntreno', resHoraFinalPorEntreno)

        let tiempoTotalEntreno = 0
        for(let i = 0; i < resHoraInicialPorEntreno.length; i++){
            tiempoTotalEntreno += resHoraFinalPorEntreno[i].horaFinal - resHoraInicialPorEntreno[i].horaInicial
        }

        const tempTotalEntreno = tiempoTotalEntreno.toString().split('.')
        if(tempTotalEntreno[1] > '59'){
            const horas = parseInt(tempTotalEntreno[0]) + 1
            let mins = parseInt(tempTotalEntreno[1]) - 60
            mins = (mins < 10) ? ('0' + mins) : mins
            tiempoTotalEntreno = horas + '.' + mins
            tiempoTotalEntreno = parseFloat(tiempoTotalEntreno)
        }

        const entrenos = {
            totalEntrenos: resTotalEntrenos[0].totalEntrenos,
            jumpOver: resJumpOver[0].jumpOver,
            boxJump: resBoxJump[0].boxJump,
            stepUp: resStepUp[0].stepUp,
            tiempoTotalEntreno: tiempoTotalEntreno.toFixed(2).replace('.', ':')
        }
        res.json(entrenos)

    } catch(err){
        console.log(err)
        res.json({message: 'error - obtener conteo entrenos'})
    }
}


const obtenerDatosEntrenos = async (req, res) => {
    const fechaInicial = req.params.fechaInicial
    const fechaFinal = req.params.fechaFinal
    const idUsuario = req.params.idUsuario
    const data = [idUsuario, fechaInicial, fechaFinal]

    mysqlConnection.query('SELECT DS.* FROM datosSensor DS INNER JOIN entreno E ON DS.idEntreno = E.idEntreno WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ?;', data, (err, rows) => {
        if(err){
            console.log(err)
            return res.json({message: 'error - obtener datos entrenos'})
        }
        res.json(rows)
    })
}


module.exports = {
    crearEntreno,
    obtenerConteoEntrenos,
    obtenerDatosEntrenos
}