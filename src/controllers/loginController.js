const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verificarUsuarioCredenciales } = require('../models/loginModel');
const { crearPayload, generarToken } = require('../helpers/authHelper');

const loginUsuario = async (req, res) => {
    try {
        const { correo_electronico, password_usuario } = req.body;
        const user = await verificarUsuarioCredenciales(correo_electronico);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas'});
        }

        const isMatch = await bcrypt.compare(password_usuario, user.password_usuario);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas'});
        }

        if (user.nombre_estado !== 'Activo') {
            return res.status(401).json({ success: false, message: 'Usuario inactivo'});
        }

        // Crear el payload para el JWT
        const payload = crearPayload(user);

        // Generar el JWT
        const token = generarToken(payload);

        // Enviar el token al cliente
        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            token: token,
            nombreCompleto: user.nombre_completo, 
            rol: user.nombre_rol,
            id: user.idUsuario,
            estado: user.nombre_estado,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al iniciar sesión: ${error.message}`});
    }
};

module.exports = { loginUsuario };