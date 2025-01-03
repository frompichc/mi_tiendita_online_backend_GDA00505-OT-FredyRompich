const express = require('express');
const { obtenerEstados, crearEstado, modificarEstado, EliminarEstado } = require('../controllers/estadosController');
const authMiddleware = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');
const router = express.Router();

//Recupera información de estados
router.get('/:idEstado?/:e_nombre?/:nombre?', authMiddleware, verificarRol(['Operador']), obtenerEstados); 

//Inserta información en tabla estados
router.post('/', authMiddleware, verificarRol(['Operador']), crearEstado);

//Modifica información en tabla estados
router.put('/:idEstado', authMiddleware, verificarRol(['Operador']), modificarEstado);

//Elimina información en tabla estados
router.delete('/:idEstado', authMiddleware, verificarRol(['Operador']), EliminarEstado);


module.exports = router;        