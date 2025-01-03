const { Sequelize } = require('sequelize');
const sequelize = require('../../dbconfig');
    

const ReinicioContrasena = {
    async reiniciarContrasena(idUsuario, hashedPassword) {
        const [result, metadata] = await sequelize.query
        (`
            DECLARE @mensaje NVARCHAR(1000);
            Exec ReiniciarContrasena
                @idUsuario = :idUsuario,
                @password_usuario = :hashedPassword, 
                @mensaje = @mensaje OUTPUT;
            SELECT @mensaje AS mensaje;
        `,
        {
            replacements: {
                idUsuario,
                hashedPassword
            },
            type: Sequelize.QueryTypes.RAW
        });
        return result[0].mensaje;

    }
    
};

module.exports = ReinicioContrasena;