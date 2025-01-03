const express = require('express');
const
{
    obtenerUsuarios, 
    registrarUsuario, 
    modificarUsuario, 
    eliminarUsuario 
} = require('../controllers/usuariosController');
const authMiddleware = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');
const router = express.Router();

//Recupera información de usuarios
router.get('/', authMiddleware, verificarRol(['Operador']), obtenerUsuarios);
//router.get('/', obtenerUsuarios);
//Inserta información en tabla usuarios
router.post('/',  authMiddleware, verificarRol(['Operador']), registrarUsuario);

//Modifica información en tabla usuarios
router.put('/:idUsuario',  authMiddleware, verificarRol(['Operador']), modificarUsuario);
//router.put('/:idUsuario',  modificarUsuario);

//Elimina información en tabla usuarios
router.delete('/:idUsuario', authMiddleware, verificarRol(['Operador']), eliminarUsuario);

module.exports = router;