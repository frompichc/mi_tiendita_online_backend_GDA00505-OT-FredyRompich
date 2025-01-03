const express = require('express');
const
{ reiniciarContrasena } = require('../controllers/reiniciarContrasenaController');
const authMiddleware = require('../middleware/auth');
const verificarRol = require('../middleware/verificarRol');
const router = express.Router();


//Reiniciar contraseña
router.put('/:idUsuario',  authMiddleware, verificarRol(['Operador']), reiniciarContrasena);
//router.put('/:idUsuario',  reiniciarContrasena);

module.exports = router;