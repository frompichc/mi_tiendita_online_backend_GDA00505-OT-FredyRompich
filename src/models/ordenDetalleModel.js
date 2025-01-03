const { Sequelize } = require('sequelize');
const sequelize = require('../../dbconfig');

const OrdenDetalle = {
    // Obtener todas las ordenes
    async obtenerOrdenDetalles(orden_idOrden) {
        const result = await sequelize.query
        (`
            EXEC ObtenerOrdenDetalles
                @orden_idOrden = :orden_idOrden;
        `,
        {
            replacements: {orden_idOrden},
            type: Sequelize.QueryTypes.SELECT
        }
        );
        return result;
    },
}

module.exports = OrdenDetalle;