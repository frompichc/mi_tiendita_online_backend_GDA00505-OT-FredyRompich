const express = require('express');
const { obtenerOrdenes, crearOrden, modificarOrden, entregarOrden, rechazarOrden } = require('../controllers/ordenesController');
const authMiddleware = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');
const router = express.Router();

// Obtiene todas las ordenes
router.get
(
    '/:idOrden?/:estado_e_nombreEstado?/:estado_nombreEstado?/:usuario_idUsuario?', 
    authMiddleware, 
    verificarRol(['Operador', 'Cliente']), 
    obtenerOrdenes
);

// Crea una nueva orden
router.post('/', authMiddleware, verificarRol(['Cliente']), crearOrden);

// Modifica una orden existente
router.put('/:orden_idOrden', authMiddleware, verificarRol(['Operador']), modificarOrden);

// Entrega orden
router.put('/entregar/:idOrden', authMiddleware, verificarRol(['Operador']), entregarOrden);

// Rechaza orden
router.put('/rechazar/:idOrden', authMiddleware, verificarRol(['Operador']), rechazarOrden);

module.exports = router;