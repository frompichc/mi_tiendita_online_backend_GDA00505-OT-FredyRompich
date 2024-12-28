const express = require('express');
const { obtenerProductos, crearProducto, modificarProducto, eliminarProducto } = require('../controllers/productosController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

//Recupera información de productos
router.get('/:idProducto?/:estado_e_nombreEstado?', authMiddleware, obtenerProductos); 

//Inserta información en tabla productos
router.post('/', authMiddleware, crearProducto);

//Modifica información en tabla productos
router.put('/:idProducto', authMiddleware, modificarProducto);

//Elimina información en tabla rol
router.delete('/:idProducto', authMiddleware, eliminarProducto);

module.exports = router;        