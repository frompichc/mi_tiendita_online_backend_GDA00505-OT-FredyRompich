const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mssql',  
  dialectOptions: {
    options: {
      encrypt: true, 
      trustServerCertificate: true, 
    },
  },
});

// Probar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log(`Conexión exitosa a SQL Server.`);
  } catch (error) {
    console.error(`No se pudo conectar a SQL Server: ${error.message}`);
  }
})();

module.exports = sequelize;