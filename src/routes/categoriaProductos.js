const express = require('express');
const { 
    obtenerCategoriaProductos,
    crearCategoriaProducto, 
    modificarCategoriaProducto,
    eliminarCategoriaProducto
} = require('../controllers/categoriaProductosController');
const authMiddleware = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');
const router = express.Router();

//Recupera información de categoriaProductos
router.get('/:idCategoriaProducto?/:estado_e_nombreEstado?', authMiddleware, verificarRol(['Operador']), obtenerCategoriaProductos); 

//Inserta información en tabla categoriaProductos
router.post('/', authMiddleware, verificarRol(['Operador']), crearCategoriaProducto);

//Modifica información en tabla categoriaProductos
router.put('/:idCategoriaProducto', authMiddleware, verificarRol(['Operador']), modificarCategoriaProducto);

//Elimina información en tabla categoriaProductos
router.delete('/:idCategoriaProducto', authMiddleware, verificarRol(['Operador']), eliminarCategoriaProducto);

module.exports = router;        