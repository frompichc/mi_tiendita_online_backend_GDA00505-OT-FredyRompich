const jwt = require('jsonwebtoken');

const generarToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const crearPayload = (user) => {
    return {
        idUsuario: user.idUsuario,
        correo_electronico: user.correo_electronico,
        rol: user.nombre_rol,
        estado: user.nombre_estado
    };
};

const verificarToken = (token) => {
    try {
        const tokenSinBearer = token.replace('Bearer ', '');
        return jwt.verify(tokenSinBearer, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Token inválido o expirado.');
    }
};

module.exports = {
    generarToken,
    crearPayload,
    verificarToken
};
