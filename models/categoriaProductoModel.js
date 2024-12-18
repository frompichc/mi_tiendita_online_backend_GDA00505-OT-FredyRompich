const { Sequelize } = require('sequelize');
const sequelize = require('../dbconfig');

const CategoriaProducto = {

    async obtenerCategoriaProductos(filtrarEstado, nombreEstado) {
        return await sequelize.query
        (`
            Exec ObtenerCategoriaProductos
                @filtrarEstado = :filtrarEstado,
                @nombreEstado = :nombreEstado
        `,
        {
            replacements: {filtrarEstado, nombreEstado},
            type: Sequelize.QueryTypes.SELECT
        });
    },

    async crearCategoriaProductos(categoriaProductosData) {
        const {nombre} = categoriaProductosData;
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec InsertarCategoriaProducto
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

    async modificarCategoriaProductos(idCategoriaProducto, categoriaProductosData) {
        const {nombre, estado_idEstado} = categoriaProductosData;
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec ModificarCategoriaProducto
                @idCategoriaProducto = :idCategoriaProducto,
                @nombre = :nombre,
                @estado_idEstado = :estado_idEstado,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: {idCategoriaProducto, nombre, estado_idEstado},
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    },

    async eliminarCategoriaProducto(idCategoriaProducto) {
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec EliminarCategoriaProducto
                @idCategoriaProducto = :idCategoriaProducto,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: { idCategoriaProducto },
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    }
};

module.exports = CategoriaProducto;