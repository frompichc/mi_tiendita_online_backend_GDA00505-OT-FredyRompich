const { Sequelize } = require('sequelize');
const sequelize = require('../dbconfig');

const Estado = {

    async obtenerEstados(idEstado, e_nombre, nombre) {
        return await sequelize.query
        (`
            Exec ObtenerEstados
                @idEstado = :idEstado,
                @e_nombre = :e_nombre,
                @nombre = :nombre
        `,
        {
            replacements: {idEstado, e_nombre, nombre},
            type: Sequelize.QueryTypes.SELECT
        });
    },

    async crearEstado(estadoData) {
        const {nombre} = estadoData;
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec InsertarEstado
                @nombre = :nombre,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: {nombre},
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    },

    async modificarEstado(idEstado, estadoData) {
        const {nombre} = estadoData;
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec ModificarEstado 
                @idEstado = :idEstado, 
                @nombre= :nombre,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: {idEstado, nombre},
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    },

    async eliminarrEstado(idEstado, ) {
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec EliminarEstado 
                @idEstado = :idEstado,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: {idEstado},
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    }

};

module.exports = Estado;