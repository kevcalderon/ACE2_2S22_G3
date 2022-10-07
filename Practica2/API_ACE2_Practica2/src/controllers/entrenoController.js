const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

const momentTimezone = require('moment-timezone')   //Libreria utilizada para dar formato a la fecha y hora

const crearEntreno = async (req, res) => {
    const {idUsuario} = req.body;

    await query("SET time_zone = 'America/Guatemala';");
    const resFecha = await query('SELECT CURDATE() as fecha;');
    const fecha = momentTimezone(resFecha[0].fecha).format('YYYY-MM-DD')

    const data = [{fecha, idUsuario}]

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
        const resNumReps = await query(`SELECT SUM(repsPorEntrenamiento) AS totalRepeticiones FROM (
                SELECT DS.*, E.idUsuario, MAX(numRepeticiones) AS repsPorEntrenamiento FROM datos_sensor DS
                INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
                GROUP BY DS.idEntreno HAVING E.idUsuario = ? AND DS.fecha BETWEEN ? AND ?
            )AS subq;`, data);
        console.log('resNumReps', resNumReps)

        const resRangoMaxMov = await query(`SELECT MAX(rangoDistancia) AS rangoMaxMov FROM datos_sensor DS
            INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
            WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ?;`, data);
        console.log('resRangoMaxMov', resRangoMaxMov)

        const resRangoPromedioMov = await query(`SELECT AVG(rangoDistancia) AS rangoPromedioMov FROM datos_sensor DS
            INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
            WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ?;`, data);
        console.log('resRangoPromedioMov', resRangoPromedioMov)

        const resTotalCalorias = await query(`SELECT SUM(caloriasPorEntrenamiento) AS totalCalorias FROM (
                SELECT DS.*, E.idUsuario, MAX(calorias) AS caloriasPorEntrenamiento FROM datos_sensor DS
                INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
                GROUP BY DS.idEntreno HAVING E.idUsuario = ? AND DS.fecha BETWEEN ? AND ?
            )AS subq;`, data);
        console.log('resTotalCalorias', resTotalCalorias)

        const resHoraInicialPorEntreno = await query(`SELECT MIN(hora) as horaInicial FROM datos_sensor DS
            INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
            WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ? 
            GROUP BY DS.idEntreno;`, data);
        console.log('resHoraInicialPorEntreno', resHoraInicialPorEntreno)

        const resHoraFinalPorEntreno = await query(`SELECT MAX(hora) as horaFinal FROM datos_sensor DS
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

        const resEntrenos = await query(`SELECT idEntreno, fecha FROM entreno 
            WHERE idUsuario = ? AND fecha BETWEEN ? AND ?`, data);
        for(let i = 0; i < resEntrenos.length; i++){
            resEntrenos[i].nombreEntreno = 'Entreno ' + (i+1)
        }

        const entrenos = {
            totalRepeticiones: resNumReps[0].totalRepeticiones,
            rangoMaxMov: resRangoMaxMov[0].rangoMaxMov,
            rangoPromedioMov: resRangoPromedioMov[0].rangoPromedioMov,
            totalCalorias: resTotalCalorias[0].totalCalorias,
            tiempoTotalEntreno: tiempoTotalEntreno.toFixed(2).replace('.', ':'),
            entrenos: resEntrenos
        }
        res.json(entrenos)

    } catch(err){
        console.log(err)
        res.json({message: 'error - obtener conteo entrenos'})
    }
}

const obtenerConteoEntreno = async (req, res) => {
    const fechaInicial = req.params.fechaInicial
    const fechaFinal = req.params.fechaFinal
    const idUsuario = req.params.idUsuario
    const idEntreno = req.params.idEntreno
    const data = [idUsuario, fechaInicial, fechaFinal, idEntreno]

    try{
        await query("SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));")
        await query("SET sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';")
        const resNumReps = await query(`SELECT SUM(repsPorEntrenamiento) AS totalRepeticiones FROM (
                SELECT DS.*, E.idUsuario, MAX(numRepeticiones) AS repsPorEntrenamiento FROM datos_sensor DS
                INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
                WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ? AND DS.idEntreno = ?
            )AS subq;`, data);
        console.log('resNumReps', resNumReps)

        const resRangoMaxMov = await query(`SELECT MAX(rangoDistancia) AS rangoMaxMov FROM datos_sensor DS
            INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
            WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ? AND DS.idEntreno = ?;`, data);
        console.log('resRangoMaxMov', resRangoMaxMov)

        const resRangoPromedioMov = await query(`SELECT AVG(rangoDistancia) AS rangoPromedioMov FROM datos_sensor DS
            INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
            WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ? AND DS.idEntreno = ?;`, data);
        console.log('resRangoPromedioMov', resRangoPromedioMov)

        const resTotalCalorias = await query(`SELECT SUM(caloriasPorEntrenamiento) AS totalCalorias FROM (
                SELECT DS.*, E.idUsuario, MAX(calorias) AS caloriasPorEntrenamiento FROM datos_sensor DS
                INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
                WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ? AND DS.idEntreno = ?
            )AS subq;`, data);
        console.log('resTotalCalorias', resTotalCalorias)

        const resHoraInicialPorEntreno = await query(`SELECT MIN(hora) as horaInicial FROM datos_sensor DS
            INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
            WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ? AND DS.idEntreno = ?;`, data);
        console.log('resHoraInicialPorEntreno', resHoraInicialPorEntreno)

        const resHoraFinalPorEntreno = await query(`SELECT MAX(hora) as horaFinal FROM datos_sensor DS
            INNER JOIN entreno E ON DS.idEntreno = E.idEntreno
            WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ? AND DS.idEntreno = ?;`, data);
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

        const entreno = {
            totalRepeticiones: resNumReps[0].totalRepeticiones,
            rangoMaxMov: resRangoMaxMov[0].rangoMaxMov,
            rangoPromedioMov: resRangoPromedioMov[0].rangoPromedioMov,
            totalCalorias: resTotalCalorias[0].totalCalorias,
            tiempoTotalEntreno: tiempoTotalEntreno.toFixed(2).replace('.', ':')
        }
        res.json(entreno)

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

    mysqlConnection.query('SELECT DS.* FROM datos_sensor DS INNER JOIN entreno E ON DS.idEntreno = E.idEntreno WHERE E.idUsuario = ? AND DS.fecha BETWEEN ? AND ?;', data, (err, rows) => {
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
    obtenerConteoEntreno,
    obtenerDatosEntrenos
}