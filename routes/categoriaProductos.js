const express = require('express');
const { 
    obtenerCategoriaProductos,
    crearCategoriaProducto, 
    modificarCategoriaProducto,
    eliminarCategoriaProducto
} = require('../controllers/categoriaProductosController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

//Recupera información de categoriaProductos
router.get('/:filtrarEstado?/:nombreEstado?', authMiddleware, obtenerCategoriaProductos); 

//Inserta información en tabla categoriaProductos
router.post('/', authMiddleware, crearCategoriaProducto);

//Modifica información en tabla categoriaProductos
router.put('/:idCategoriaProducto', authMiddleware, modificarCategoriaProducto);

//Elimina información en tabla categoriaProductos
router.delete('/:idCategoriaProducto', authMiddleware, eliminarCategoriaProducto);

module.exports = router;        