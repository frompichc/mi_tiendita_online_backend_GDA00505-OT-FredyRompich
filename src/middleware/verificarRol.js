const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        const { rol } = req.user; 
        if (!rolesPermitidos.includes(rol)) {
            return res.status(403).json({success: false, message: 'No tienes permiso para realizar esta acción.' });
        }
        next();
    };
};

module.exports = verificarRol;
