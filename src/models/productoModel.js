const { Sequelize } = require('sequelize');
const sequelize = require('../../dbconfig');

const Producto = {

    async obtenerProductos(idProducto, estado_e_nombreEstado) {
        return await sequelize.query
        (`
            EXEC ObtenerProductos
                @idProducto = :idProducto,
                @estado_e_nombreEstado = :estado_e_nombreEstado 
        `,
        {
            replacements: {idProducto, estado_e_nombreEstado},
            type: Sequelize.QueryTypes.SELECT
        })
    },

    async crearProducto(productoData) {
        const
        {
            categoriaProducto_idCategoriaProducto,
            nombre,
            marca,
            codigo,
            stock,
            precio,
            bufferFoto,
            tipoImagen,
        } = productoData;
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Execute InsertarProducto
                @categoriaProducto_idCategoriaProducto = :categoriaProducto_idCategoriaProducto,
                @nombre = :nombre,
                @marca = :marca,
                @codigo = :codigo,
                @stock = :stock,
                @precio = :precio,
                @foto = :foto,
                @tipoImagen = :tipoImagen,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `, 
        {
            replacements:
            {
                categoriaProducto_idCategoriaProducto,
                nombre,
                marca,
                codigo,
                stock,
                precio,
                foto: bufferFoto,
                tipoImagen
            },
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    },
    
    async modificarProducto(idProducto, productoData) {
        const
        {
            categoriaProducto_idCategoriaProducto,
            nombre,
            marca,
            codigo,
            stock,
            estado_idEstado,
            precio,
            bufferFoto,
            tipoImagen
        } = productoData;

        const [result, metadata] = await sequelize.query(`
            DECLARE @mensaje NVARCHAR(1000);
            Execute ModificarProducto
                @idProducto = :idProducto,
                @categoriaProducto_idCategoriaProducto = :categoriaProducto_idCategoriaProducto,
                @nombre = :nombre,
                @marca = :marca,
                @codigo = :codigo,
                @stock = :stock,
                @estado_idEstado = :estado_idEstado,
                @precio = :precio,
                @foto = :foto,
                @tipoImagen = :tipoImagen,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;           
        `, 
        {
            replacements:
            {
                idProducto,
                categoriaProducto_idCategoriaProducto,
                nombre,
                marca,
                codigo,
                stock,
                estado_idEstado,
                precio,
                foto: bufferFoto,
                tipoImagen
            },
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    },

    async eliminarProducto(idProducto) {
        const [result, metadata] = await sequelize.query(`
            DECLARE @mensaje NVARCHAR(1000);
            Execute EliminarProducto
                @idProducto = :idProducto,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;    
        `, 
        {
            replacements: { idProducto },
            type: Sequelize.QueryTypes.RAW
        });

        return result[0].mensaje;
    }

}

module.exports = Producto;