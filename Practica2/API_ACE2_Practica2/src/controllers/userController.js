const mysqlConnection = require('../database/db')
const util = require('util');
const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);

const momentTimezone = require('moment-timezone')   //Libreria utilizada para dar formato a la fecha y hora
momentTimezone().tz('America/Guatemala')

const crearUsuario = (req, res) => {
    const {nombreUsuario, password, edad, peso, genero, estatura} = req.body;
    const data = [{nombreUsuario, password, edad, peso, genero, estatura}]
    
    mysqlConnection.query('INSERT INTO usuario SET ?', data, (err, rows) => {
        if(err){
            console.log(err)
            return res.json({message: 'error - crear usuario'})
        }
        res.json({message: 'usuario creado'})
    })
}

const login = async (req, res) => {
    const {nombreUsuario, password} = req.body

    await query("SET time_zone = 'America/Guatemala';");
    const resFechaHora = await query('SELECT NOW() as fechaFull;');
    const fechaHora = momentTimezone(resFechaHora[0].fechaFull).format('YYYY-MM-DD HH:mm')

    mysqlConnection.query('SELECT * FROM usuario WHERE nombreUsuario = ? AND password = ?', [nombreUsuario, password], (err, rows) => {
        if(err){
            console.log(err)
            return res.json({message: 'error - login'})
        }
        if(!rows[0]) return res.json({auth: false})
        rows[0].fechaHora = fechaHora
        res.json(rows[0])   
    })
}

module.exports = {
    crearUsuario,
    login
}