const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verificarUsuarioCredenciales } = require('../models/loginModel');

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

        // Crear el payload para el JWT
        const payload = {
            idUsuario: user.idUsuario,
            correo_electronico,
        };

        // Generar el JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Enviar el token al cliente
        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            token: token,
            nombreCompleto: user.nombre_completo, // Añadir el nombre completo
            rol: user.nombre_rol, // Añadir el rol del usuario
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al iniciar sesión: ${error.message}`});
    }
};

module.exports = { loginUsuario };