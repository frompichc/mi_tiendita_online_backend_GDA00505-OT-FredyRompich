const { Sequelize } = require('sequelize');
const sequelize = require('../dbconfig');

const Orden = {
    // Obtener todas las ordenes
    async obtenerOrdenes() {
        const result = await sequelize.query(
            `
                SELECT 
                    idOrden,
                    usuario_idUsuario,
                    estado_idEstado,
                    fecha_creacion,
                    direccion,
                    telefono,
                    correo_electronico,
                    fecha_entrega,
                    total_orden
                FROM Ordenes
            `,
            {
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