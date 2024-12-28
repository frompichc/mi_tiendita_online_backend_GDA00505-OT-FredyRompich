const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    // Verificar si el token existe
    if (!token) {
        return res.status(401).send('Acceso denegado. Token no proporcionado.');
    }

    try {
        // Validar el token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Agregar los datos del usuario al objeto `req`
        next(); // Continuar hacia el siguiente middleware o controlador
    } catch (error) {
        res.status(401).send('Token inválido.');
    }
};

module.exports = authMiddleware;
