const { Sequelize } = require('sequelize');
const sequelize = require('../../dbconfig');
    

const Usuario = {
    async obtenerUsuarios(idUsuario, estado_e_nombreEstado) {
        return await sequelize.query
        (`
            Exec ObtenerUsuarios
                @idUsuario = :idUsuario,
                @estado_e_nombreEstado = :estado_e_nombreEstado
        `,
        {
            replacements: {idUsuario, estado_e_nombreEstado},
            type: Sequelize.QueryTypes.SELECT
        });
    },

    async crearUsuario(usuarioData) {
        const {
            rol_idRol,
            correo_electronico,
            nombre_completo,
            hashedPassword,
            telefono,
            fecha_nacimiento_string,
            cliente_idCliente = null
        } = usuarioData;
     
        const [result, metadata] = await sequelize.query
            (`
                DECLARE @mensaje NVARCHAR(1000);
                Exec InsertarUsuario 
                    @rol_idRol = :rol_idRol,
                    @correo_electronico = :correo_electronico,
                    @nombre_completo = :nombre_completo,
                    @password_usuario = :hashedPassword,
                    @telefono = :telefono,
                    @fecha_nacimiento = :fecha_nacimiento_string,
                    @cliente_idCliente = :cliente_idCliente,
                    @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
            `,
            {
                replacements:
                {
                    rol_idRol,
                    correo_electronico,
                    nombre_completo,
                    hashedPassword,
                    telefono,
                    fecha_nacimiento_string,
                    cliente_idCliente
                },
                type: Sequelize.QueryTypes.RAW
            });
        return result[0].mensaje;
    },

    async modificarUsuario(idUsuario, usuarioData) {
        const {
            rol_idRol,
            estado_idEstado,
            correo_electronico,
            nombre_completo,
            telefono,
            cliente_idCliente
        } = usuarioData;
    
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec ModificarUsuario
                @idUsuario = :idUsuario,
                @rol_idRol = :rol_idRol,
                @estado_idEstado = :estado_idEstado,
                @correo_electronico = :correo_electronico,
                @nombre_completo = :nombre_completo,
                @telefono = :telefono,
                @cliente_idCliente = :cliente_idCliente,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: {
                idUsuario,
                rol_idRol,
                estado_idEstado,
                correo_electronico,
                nombre_completo,
                telefono,
                cliente_idCliente
            },
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;

    },

    async eliminarUsuario(idUsuario) {
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec EliminarUsuario
                @idUsuario = :idUsuario,
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: {
                idUsuario
            },
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;
    }
    
};

module.exports = Usuario;