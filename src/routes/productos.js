const express = require('express');
const { obtenerProductos, crearProducto, modificarProducto, eliminarProducto } = require('../controllers/productosController');
const authMiddleware = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');
const router = express.Router();

//Recupera información de productos
router.get('/:idProducto?/:estado_e_nombreEstado?', authMiddleware, verificarRol(['Operador', 'Cliente']), obtenerProductos); 

//Inserta información en tabla productos
router.post('/', authMiddleware, verificarRol(['Operador']), crearProducto);

//Modifica información en tabla productos
router.put('/:idProducto', authMiddleware, verificarRol(['Operador']), modificarProducto);

//Elimina información en tabla rol
router.delete('/:idProducto', authMiddleware, verificarRol(['Operador']), eliminarProducto);

module.exports = router;        