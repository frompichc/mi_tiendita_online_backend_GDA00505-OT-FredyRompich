const { Sequelize } = require('sequelize');
const sequelize = require('../dbconfig');

const Rol = {
    async obtenerRoles(idRol, estado_e_nombreEstado, estado_nombreEstado) {
     
        return await sequelize.query
        (`
            EXEC ObtenerRoles 
                @idRol = :idRol,
                @estado_e_nombreEstado = :estado_e_nombreEstado, 
                @estado_nombreEstado = :estado_nombreEstado 
        `,
        {
            replacements: {idRol, estado_e_nombreEstado, estado_nombreEstado, },
            type: Sequelize.QueryTypes.SELECT
        });
    },

    async crearRol(rolData) {
        const {nombre} = rolData;

        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            EXEC InsertarRol
                @nombre= :nombre,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: {nombre},
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;

    },

    async modificarRol(idRol, rolData) {
        const {nombre, estado_idEstado} = rolData;

        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec ModificarRol 
                @idRol = :idRol, 
                @nombre = :nombre, 
                @estado_idEstado = :estado_idEstado,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: {idRol, nombre, estado_idEstado},
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    },

    async eliminarRol(idRol) {
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec EliminarRol
                @idRol = :idRol,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: {idRol},
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    }
};

module.exports = Rol;