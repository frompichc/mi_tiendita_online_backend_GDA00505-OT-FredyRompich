const { Sequelize } = require('sequelize');
const sequelize = require('../dbconfig');

const Cliente = {

    async obtenerClientes() {
        return await sequelize.query
        (`
            SELECT 
                idCliente,
                razon_social,
                nombre_comercial,
                direccion_entrega,
                telefono,
                email,
                estado_idEstado
            FROM clientes
        `,
        {
            type: Sequelize.QueryTypes.SELECT
        });
    },

    async crearCliente(clienteData) {
        const 
        {
            razon_social, 
            nombre_comercial, 
            direccion_entrega, 
            telefono, 
            email
        } = clienteData;

        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec InsertarCliente
                @razon_social = :razon_social,
                @nombre_comercial = :nombre_comercial,
                @direccion_entrega = :direccion_entrega,
                @telefono = :telefono,
                @email = :email,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements:
            {
                razon_social,
                nombre_comercial,
                direccion_entrega,
                telefono,
                email
            },
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    }, 

    async modificarCliente(idCliente, clienteData) {
        const 
        {
            razon_social, 
            nombre_comercial, 
            direccion_entrega, 
            telefono, 
            email,
            estado_idEstado
        } = clienteData;

        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec ModificarCliente
                @idCliente = :idCliente,
                @razon_social = :razon_social,
                @nombre_comercial = :nombre_comercial,
                @direccion_entrega = :direccion_entrega,
                @telefono = :telefono,
                @email = :email,
                @estado_idEstado = :estado_idEstado,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements:
            {
                idCliente,
                razon_social,
                nombre_comercial,
                direccion_entrega,
                telefono,
                email,
                estado_idEstado
            },
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    },

    async eliminarCliente(idCliente) {
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec EliminarCliente
                @idCliente = :idCliente,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: { idCliente},
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    }

};

module.exports = Cliente;