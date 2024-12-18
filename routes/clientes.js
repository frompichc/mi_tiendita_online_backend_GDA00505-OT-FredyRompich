const express = require('express');
const { obtenerClientes, crearCliente, modificarCliente, eliminarCliente } = require('../controllers/clientesController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

//Recupera información de clientes
router.get('/', authMiddleware, obtenerClientes); 

//Inserta información en tabla clientes
router.post('/', authMiddleware, crearCliente);

//Modifica información en tabla clientes
router.put('/:idCliente', authMiddleware, modificarCliente);

//Modifica información en tabla clientes
router.delete('/:idCliente', authMiddleware, eliminarCliente);

module.exports = router;        