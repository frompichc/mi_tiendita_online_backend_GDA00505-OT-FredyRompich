const express = require('express');
const { obtenerRoles, crearRol, modificarRol, eliminarRol } = require('../controllers/rolesController');
const authMiddleware = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');
const router = express.Router();

//Recupera información de roles
router.get('/:idRol?/:estado_e_nombreEstado?/:estado_nombreEstado?/', authMiddleware, verificarRol(['Operador']), obtenerRoles);

//Inserta información en tabla roles
router.post('/', authMiddleware, verificarRol(['Operador']), crearRol);

//Modifica información en tabla roles
router.put('/:idRol', authMiddleware, verificarRol(['Operador']), modificarRol);

//Elimina información en tabla rol
router.delete('/:idRol', authMiddleware, verificarRol(['Operador']), eliminarRol);

module.exports = router;