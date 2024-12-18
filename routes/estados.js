const express = require('express');
const { obtenerEstados, crearEstado, modificarEstado, EliminarEstado } = require('../controllers/estadosController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

//Recupera información de estados
router.get('/:idEstado?/:nombre?', authMiddleware, obtenerEstados); 

//Inserta información en tabla estados
router.post('/', authMiddleware, crearEstado);

//Modifica información en tabla estados
router.put('/:idEstado', authMiddleware, modificarEstado);

//Elimina información en tabla estados
router.delete('/:idEstado', authMiddleware, EliminarEstado);


module.exports = router;        