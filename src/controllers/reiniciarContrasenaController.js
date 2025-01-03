const bcrypt = require("bcryptjs");
const ReinicioContrasena = require('../models/reiniciarContrasenaModel');
const { validarCampos } = require('../helpers/validacionesCamposHelper');

const reiniciarContrasena = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { password_usuario } = req.body;

    const errores = validarCampos({
      idUsuario: {valor: idUsuario, requerido: true, esNumero: true},
      password_usuario: {valor: password_usuario, requerido: true}
    });

    if (errores.length > 0) {
      return res.status(400).json({ success: false, message: 'Errores de validación', errores });
    }
    
    const hashedPassword = await bcrypt.hash(password_usuario, 10);
    const mensaje = await ReinicioContrasena.reiniciarContrasena(idUsuario, hashedPassword);

    if (mensaje.includes('ERROR')) {
      return res.status(500).json({ success: false, message: mensaje});
    }

    res.status(200).json({ success: true, message: `Contraseña reiniciada para usuario con id ${idUsuario}`});
  } catch (error) {
    res.status(500).json({ success: false, message: `Error al reiniciar contraseña: ${error.message}`});
  }
};

module.exports = {reiniciarContrasena};