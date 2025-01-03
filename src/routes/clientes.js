const express = require('express');
const { obtenerClientes, crearCliente, modificarCliente, eliminarCliente } = require('../controllers/clientesController');
const authMiddleware = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');
const router = express.Router();

//Recupera información de clientes
router.get('/:idCliente?/:estado_e_nombreEstado?/:estado_nombreEstado?', authMiddleware, verificarRol(['Operador']), obtenerClientes); 

//Inserta información en tabla clientes
router.post('/', authMiddleware, verificarRol(['Operador']), crearCliente);

//Modifica información en tabla clientes
router.put('/:idCliente', authMiddleware, verificarRol(['Operador']), modificarCliente);

//Modifica información en tabla clientes
router.delete('/:idCliente', authMiddleware, verificarRol(['Operador']), eliminarCliente);

module.exports = router;        