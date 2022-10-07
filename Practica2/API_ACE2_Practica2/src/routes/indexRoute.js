const {Router} = require('express')
const router = Router()

const userController = require('../controllers/userController')
const entrenoController = require('../controllers/entrenoController')
const sensorController = require('../controllers/sensorController')

router.post('/usuario', userController.crearUsuario)
router.post('/login', userController.login)

router.post('/entreno', entrenoController.crearEntreno)

//Obtener datos del primer dashboard web - Conteo de Entrenos
router.get('/entreno-dashboard/conteo/fechaInicial/:fechaInicial/fechaFinal/:fechaFinal/idUsuario/:idUsuario', entrenoController.obtenerConteoEntrenos)

//Obtener datos del primer dashboard web - Conteo de un Entreno
router.get('/entreno-dashboard/conteo/fechaInicial/:fechaInicial/fechaFinal/:fechaFinal/idUsuario/:idUsuario/idEntreno/:idEntreno', entrenoController.obtenerConteoEntreno)

//Obtener datos de pulso cardiaco, rango de movimiento y calorias quemadas, para su respectiva gráfica requerida en el dashboard web
router.get('/entreno-dashboard/grafica/fechaInicial/:fechaInicial/fechaFinal/:fechaFinal/idUsuario/:idUsuario', entrenoController.obtenerDatosEntrenos)

//Obtener datos de sensor en tiempo real
router.get('/datosSensor/idEntreno/:idEntreno', sensorController.obtenerDatosSensor)

module.exports = router