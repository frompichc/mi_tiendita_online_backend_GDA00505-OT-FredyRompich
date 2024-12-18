const express = require('express');
const { loginUsuario } = require('../controllers/loginController');
const router = express.Router();

// Ruta para iniciar sesión
router.post('/', loginUsuario);

module.exports = router;