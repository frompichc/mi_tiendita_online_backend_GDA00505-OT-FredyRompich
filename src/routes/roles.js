const express = require('express');
const { obtenerRoles, crearRol, modificarRol, eliminarRol } = require('../controllers/rolesController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

//Recupera información de roles
router.get('/:idRol?/:estado_e_nombreEstado?/:estado_nombreEstado?/', authMiddleware, obtenerRoles);

//Inserta información en tabla roles
router.post('/', authMiddleware, crearRol);

//Modifica información en tabla roles
router.put('/:idRol', authMiddleware, modificarRol);

//Elimina información en tabla rol
router.delete('/:idRol', authMiddleware, eliminarRol);

module.exports = router;