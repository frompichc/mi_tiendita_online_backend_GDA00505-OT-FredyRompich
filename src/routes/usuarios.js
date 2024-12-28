const express = require('express');
const { obtenerUsuarios, registrarUsuario, modificarUsuario, eliminarUsuario } = require('../controllers/usuariosController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

//Recupera información de usuarios
router.get('/', obtenerUsuarios);

//Inserta información en tabla usuarios
router.post('/',  authMiddleware, registrarUsuario);

//Modifica información en tabla usuarios
router.put('/:idUsuario',  modificarUsuario);

//Elimina información en tabla usuarios
router.delete('/:idUsuario', authMiddleware, eliminarUsuario);

module.exports = router;