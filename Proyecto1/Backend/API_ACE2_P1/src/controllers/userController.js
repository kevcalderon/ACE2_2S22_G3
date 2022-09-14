const mysqlConnection = require('../database/db')

const crearUsuario = (req, res) => {
    const {nombreUsuario, edad, peso, genero, estatura} = req.body;
    const data = [{nombreUsuario, edad, peso, genero, estatura}]

    mysqlConnection.query('INSERT INTO usuario SET ?', data, (err, rows) => {
        if(err){
            console.log(err)
            return res.json({message: 'error - crear usuario'})
        }
        res.json({message: 'usuario creado'})
    })

}

const login = (req, res) => {
    const {nombreUsuario} = req.body

    mysqlConnection.query('SELECT * FROM usuario WHERE nombreUsuario = ?', [nombreUsuario], (err, rows) => {
        if(err){
            console.log(err)
            return res.json({message: 'error - login'})
        }
        if(!rows[0]) return res.json({auth: false})
        res.json(rows[0])   
    })
}

module.exports = {
    crearUsuario,
    login
}