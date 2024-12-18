const Rol = require('../models/rolModel');
const { validarCampos } = require('../helpers/validacionesCamposHelper');

const obtenerRoles = async (req, res) => {
    try {
        let {idRol = null, estado_e_nombreEstado = null, estado_nombreEstado = null } = req.query;
        console.log(estado_e_nombreEstado);
      
        const roles = await Rol.obtenerRoles(idRol, estado_e_nombreEstado, estado_nombreEstado);
        res.status(200).json({ success: true, data: roles});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al obtener los roles: ${error.message}`});
    }
}

const crearRol = async (req, res) => {
    try {
        const {nombre} = req.body;
     
        const errores = validarCampos({
            nombre: {valor: nombre, requerido: true}
        });
      
        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await Rol.crearRol({nombre});
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(201).json({ success: true, message: 'Rol creado exitosamente'});

    } catch (error) {
        res.status(500).json({ success: false, message: `Error al crear rol: ${error.message}`});
    }
};

const modificarRol = async (req, res) => {
    try {
        const {idRol} = req.params;
        const {nombre, estado_idEstado} = req.body;

        const errores = validarCampos({
            idRol: {valor: idRol, requerido: true, esNumero: true},
            nombre: {valor: nombre, requerido: true},
            estado_idEstado: {valor: estado_idEstado, requerido: true, esNumero: true}
        });
      
        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }
    
        const mensaje = await Rol.modificarRol(idRol,{nombre, estado_idEstado});
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: `Rol con id ${idRol} modificado exitosamente`});
    
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al modificar rol: ${error.message}`});
    }
};

const eliminarRol = async (req, res) => {
    try {
        const { idRol } = req.params;

        const errores = validarCampos({
            idRol: {valor: idRol, requerido: true, esNumero: true},
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await Rol.eliminarRol(idRol);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: 'Rol eliminado correctamente'});

    } catch (error) {
        res.status(500).json({ success: false, message: `Error al eliminar Rol: ${error.message}`});
    }
}

module.exports = { obtenerRoles, crearRol, modificarRol, eliminarRol };