const { Sequelize } = require('sequelize');
const sequelize = require('../dbconfig');
const { eliminarUsuario } = require('../controllers/usuariosController');

const Usuario = {
    async obtenerUsuarios() {
        return await sequelize.query(
            `SELECT idUsuario, rol_idRol, estado_idEstado, correo_electronico, nombre_completo, password_usuario, telefono, fecha_nacimiento, fecha_creacion, cliente_idCliente FROM Usuarios`, {
            type: Sequelize.QueryTypes.SELECT
        });
    },

    async crearUsuario(usuarioData) {
        const {
            rol_idRol,
            estado_idEstado,
            correo_electronico,
            nombre_completo,
            hashedPassword,
            telefono,
            fecha_nacimiento,
             cliente_idCliente
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
                    @fecha_nacimiento = :fecha_nacimiento,
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
                    fecha_nacimiento,
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
            hashedPassword,
            telefono,
            fecha_nacimiento,
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
                @password_usuario = :hashedPassword,
                @telefono = :telefono,
                @fecha_nacimiento = :fecha_nacimiento,
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
                hashedPassword,
                telefono,
                fecha_nacimiento,
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