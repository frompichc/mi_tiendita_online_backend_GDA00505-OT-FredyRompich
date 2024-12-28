const { Sequelize } = require('sequelize'); 
const sequelize = require('../../dbconfig');

const verificarUsuarioCredenciales = async (correo_electronico) => {
    try {
        const [user] = await sequelize.query
        (`  
            Exec ObtenerUsuarioLogin
                @correo_electronico = :correo_electronico
        `,
        {
            replacements: { correo_electronico },
            type: Sequelize.QueryTypes.SELECT,
        });
        return user || null;
    } catch (error) {
        console.error(`Error al verificar credenciales: ${error.message}`);
        throw new Error('Error al verificar las credenciales');
    }
};

module.exports = { verificarUsuarioCredenciales };