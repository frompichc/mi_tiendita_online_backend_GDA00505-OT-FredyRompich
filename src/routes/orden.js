const express = require('express');
const { obtenerOrdenes, crearOrden, modificarOrden } = require('../controllers/ordenesController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Obtiene todas las ordenes
router.get('/:idOrden?/:estado_e_nombreEstado?/:estado_nombreEstado?/:usuario_idUsuario?', authMiddleware, obtenerOrdenes);

// Crea una nueva orden
router.post('/', authMiddleware, crearOrden);

// Modifica una orden existente
router.put('/:orden_idOrden', authMiddleware, modificarOrden);

module.exports = router;