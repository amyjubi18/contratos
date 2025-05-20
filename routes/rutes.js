const {inicio} = require('../controllers/inicioController');
const {verEmpleados, agregarEmpleado, actualizarEmpleado, eliminarEmpleado, verEmpleadoPorId} = require('../controllers/empleadoController');
const {verGerencia, agregarGerencia, actualizarGerencia, eliminarGerencia, verGerenciaPorId} = require('../controllers/gerenciaController');
const {verDirectivo, agregarDirectivo, verDirectivoPorId, actualizarDirectivo, eliminarDirectivo} = require('../controllers/directivosController');
const {verContratos, verContratosPorId, agregarContrato, actualizarContrato, eliminarContrato} = require('../controllers/cdtController');
const Router = require('express');
const router = Router();

//empleados
router.get('/empleados', verEmpleados);
router.post('/empleados', agregarEmpleado);
router.put('/empleados/:id', actualizarEmpleado);
router.delete('/empleados/:id', eliminarEmpleado);
router.get('/empleados/:id', verEmpleadoPorId);

//gerencias
router.get('/gerencias', verGerencia);
router.post('/gerencias', agregarGerencia);
router.get('/gerencias/:id', verGerenciaPorId);
router.put('/gerencias/:id', actualizarGerencia);
router.delete('/gerencias/:id', eliminarGerencia);

//directivos
router.get('/directivos', verDirectivo);
router.post('/directivos', agregarDirectivo);
router.get('/directivos/:id', verDirectivoPorId);
router.put('/directivos/:id', actualizarDirectivo);
router.delete('/directivos/:id', eliminarDirectivo);

//contratos
router.get('/contratos', verContratos);
router.get('/contratos/:id', verContratosPorId);
router.post('/contratos', agregarContrato);
router.put('/contratos/:id', actualizarContrato);
router.delete('/contratos/:id', eliminarContrato);

router.get('/', inicio);
module.exports = router;