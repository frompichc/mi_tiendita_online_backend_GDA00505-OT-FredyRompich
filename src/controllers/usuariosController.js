const bcrypt = require("bcryptjs");
const Usuario = require('../models/usuarioModel');
const { validarCampos } = require('../helpers/validacionesCamposHelper');

const obtenerUsuarios = async (req, res) => {
  try {
    let {idUsuario = null, estado_e_nombreEstado = null} = req.query;
    const usuarios = await Usuario.obtenerUsuarios(idUsuario, estado_e_nombreEstado);
    res.status(200).json({ success: true, data: usuarios});
  } catch (error) {
    res.status(500).json({ success: false, message: `Error al obtener los usuarios: ${error.message}`});
  }
};

const registrarUsuario = async (req, res) => {
  try {
    const { 
      rol_idRol, 
      estado_idEstado, 
      correo_electronico, 
      nombre_completo, 
      password_usuario, 
      telefono, 
      fecha_nacimiento, 
      cliente_idCliente 
    } = req.body;

    
    console.log(req.body);
    const errores = validarCampos({
      rol_idRol: {valor: rol_idRol, requerido: true, esNumero: true},
      correo_electronico: {valor: correo_electronico, requerido: true, esCorreo: true},
      nombre_completo: {valor: nombre_completo, requerido: true},
      password_usuario: {valor: password_usuario, requerido: true},
      telefono: {valor: telefono, requerido: true, esNumero: true, longitudMin: 8, longitudMax: 8},
      //fecha_nacimiento: {valor: fecha_nacimiento, requerido: true, esFecha: true},
      cliente_idCliente: {valor: cliente_idCliente, esNumero: true}  
    });

    if (errores.length > 0) {
      return res.status(400).json({ success: false, message: 'Errores de validación', errores });
    }

    
    const hashedPassword = await bcrypt.hash(password_usuario, 10);
    const mensaje = await Usuario.crearUsuario({
      rol_idRol, estado_idEstado, correo_electronico, nombre_completo,
      hashedPassword, telefono, fecha_nacimiento, cliente_idCliente
    });

    if (mensaje.includes('ERROR')) {
      return res.status(500).json({ success: false, message: mensaje});
    }

    res.status(201).json({ success: true, message:'Usuario creado exitosamente'});
  } catch (error) {
    res.status(500).json({success: false, message: `Error al registrar usuario: ${error.message}`});
  }
};

const modificarUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { 
      rol_idRol, 
      estado_idEstado, 
      correo_electronico, 
      nombre_completo, 
      password_usuario, 
      telefono, 
      fecha_nacimiento, 
      cliente_idCliente 
    } = req.body;

    const errores = validarCampos({
      idUsuario: {valor: idUsuario, requerido: true, esNumero: true},
      rol_idRol: {valor: rol_idRol, requerido: true, esNumero: true},
      estado_idEstado: {valor: estado_idEstado, requerido: true, esNumero: true},
      correo_electronico: {valor: correo_electronico, requerido: true, esCorreo: true},
      nombre_completo: {valor: nombre_completo, requerido: true},
      password_usuario: {valor: password_usuario, requerido: true},
      telefono: {valor: telefono, requerido: true, esNumero: true, longitudMin: 8, longitudMax: 8},
      fecha_nacimiento: {valor: fecha_nacimiento, requerido: true, esFecha: true},
      cliente_idCliente: {valor: cliente_idCliente, esNumero: true}  
    });

    if (errores.length > 0) {
      return res.status(400).json({ success: false, message: 'Errores de validación', errores });
    }
  
    
    const hashedPassword = await bcrypt.hash(password_usuario, 10);
    const mensaje = await Usuario.modificarUsuario(idUsuario, {
      rol_idRol, estado_idEstado, correo_electronico, nombre_completo,
      hashedPassword, telefono, fecha_nacimiento, cliente_idCliente
    });

    if (mensaje.includes('ERROR')) {
      return res.status(500).json({ success: false, message: mensaje});
    }

    res.status(200).json({ success: true, message: `Usuario con id ${idUsuario} modificado exitosamente`});
  } catch (error) {
    res.status(500).json({ success: false, message: `Error al actualizar usuario: ${error.message}`});
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    const errores = validarCampos({
      idUsuario: {valor: idUsuario, requerido: true, esNumero: true}
    });

    if (errores.length > 0) {
      return res.status(400).json({ success: false, message: 'Errores de validación', errores });
    }

    const mensaje = await Usuario.eliminarUsuario(idUsuario);
    if (mensaje.includes('ERROR')) {
      return res.status(500).json({ success: false, message: mensaje});
    }
    res.status(200).json({ success: true, message: 'Usuario eliminado correctamente'});
  } catch (error) {
    res.status(500).send({ success: false, message: `Error al eliminar usuario: ${error.message}`});
  }
};

module.exports = { obtenerUsuarios, registrarUsuario, modificarUsuario, eliminarUsuario };