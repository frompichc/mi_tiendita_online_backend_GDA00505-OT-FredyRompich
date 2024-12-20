const { Sequelize } = require('sequelize');
const sequelize = require('../dbconfig');

const Producto = {

    async obtenerProductos() {
        return await sequelize.query
        (`
            SELECT
                idProducto,
                categoriaProducto_idCategoriaProducto,
                nombre,
                marca,
                codigo,
                stock,
                estado_idEstado,
                precio,
                fecha_creacion,
                foto
            FROM Productos
        `,
        {
            type: Sequelize.QueryTypes.SELECT
        })
    },

    async crearProducto(productoData) {
        console.log('productData', productoData)
        const
        {
            categoriaProducto_idCategoriaProducto,
            nombre,
            marca,
            codigo,
            stock,
            precio,
            bufferFoto
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
                foto: bufferFoto
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
            foto
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
                foto
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