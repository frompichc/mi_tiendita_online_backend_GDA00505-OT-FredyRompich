const express = require('express');
const { obtenerOrdenDetalles } = require('../controllers/ordenDetallesController');
const authMiddleware = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');
const router = express.Router();

// Obtiene todas las ordenes
router.get('/:orden_idOrden?', authMiddleware, verificarRol(['Operador', 'Cliente']), obtenerOrdenDetalles);

module.exports = router;