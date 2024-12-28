const { Sequelize } = require('sequelize');
const sequelize = require('../../dbconfig');

const Orden = {
    // Obtener todas las ordenes
    async obtenerOrdenes(idOrden, estado_e_nombreEstado, estado_nombreEstado, usuario_idUsuario) {
        const result = await sequelize.query
        (`
            Exec ObtenerOrdenes
                @idOrden = :idOrden,
                @estado_e_nombreEstado = :estado_e_nombreEstado,
                @estado_nombreEstado = :estado_nombreEstado,
                @usuario_idUsuario = :usuario_idUsuario;
        `,
        {
            replacements: {idOrden, estado_e_nombreEstado, estado_nombreEstado, usuario_idUsuario},
            type: Sequelize.QueryTypes.SELECT
        }
        );
        return result;
    },

    // Crear una nueva orden con detalles
    async crearOrdenConDetalle(ordenConDetalleJSON) {
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec InsertarOrdenConDetalle
                @ordenConDetalle = :ordenConDetalle,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: { ordenConDetalle: ordenConDetalleJSON },
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    },

    // Modificar una orden existente
    async modificarOrdenConDetalle(ordenConDetalleJSON) {
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec ModificarOrdenConDetalle
                @ordenConDetalle = :ordenConDetalle,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: { ordenConDetalle: ordenConDetalleJSON },
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    }
};

module.exports = Orden;