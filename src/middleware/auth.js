const { verificarToken } = require('../helpers/authHelper');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    // Verificar si el token existe
    if (!token) {
        return res.status(401).send({success: false, message: 'Acceso denegado. Token no proporcionado.'});
    }

    try {
        //Valida token
        const decoded = verificarToken(token);
        req.user = decoded;
        //Valida estado del usuario 
        if (req.user.estado !== 'Activo') {
            return res.status(403).send({success: false, message: 'Cuenta inactiva. No tienes permiso para realizar esta acción.'});
        }
        next(); 
    } catch (error) {
        res.status(401).send({success: false, message: 'Token inválido.'});
    }
};

module.exports = authMiddleware;
