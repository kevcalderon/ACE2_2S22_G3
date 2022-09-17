const {Router} = require('express')
const router = Router()

const userController = require('../controllers/userController')
const entrenoController = require('../controllers/entrenoController')
const sensorController = require('../controllers/sensorController')

router.post('/usuario', userController.crearUsuario)
router.post('/login', userController.login)

//Crear un nuevo entreno al seleccionar un tipo de entreno
router.post('/entreno', entrenoController.crearEntreno)
//Obtener datos del primer dashboard web
router.get('/entreno-dashboard/fechaInicial/:fechaInicial/fechaFinal/:fechaFinal/idUsuario/:idUsuario', entrenoController.obtenerEntrenos)

//Obtener datos de sensor en tiempo real
router.get('/datosSensor/idUsuario/:idUsuario', sensorController.obtenerDatosSensor)

module.exports = router