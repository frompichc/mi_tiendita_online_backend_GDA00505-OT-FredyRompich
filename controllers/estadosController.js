const Estado = require('../models/estadoModel');
const { validarCampos } = require('../helpers/validacionesCamposHelper');

const obtenerEstados = async (req, res) => {
    try {
        let {idEstado = null, e_nombre = null, nombre = null} = req.query;
   
        const estados = await Estado.obtenerEstados(idEstado, e_nombre, nombre);
        res.status(200).json({ success: true, data: estados});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al obtener los estados: ${error.message}`});
    }
};

const crearEstado  = async (req, res) => {
    try {
        const {nombre} = req.body;

        const errores = validarCampos({
            nombre: {valor: nombre, requerido: true}
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await Estado.crearEstado(req.body);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(201).json({ success: true, message: `Estado creado exitosamente`});

    } catch (error) {
        res.status(500).json({ success: false, message: `Error al crear el estado: ${error.message}`});
    }
};

const modificarEstado = async (req, res) => {
    try {
        const {idEstado} = req.params;
        const {nombre} = req.body;

        const errores = validarCampos({
            idEstado: {valor: idEstado, requerido: true, esNumero: true},
            nombre: {valor: nombre, requerido: true}
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await Estado.modificarEstado(idEstado, req.body);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: `Estado con id ${idEstado} modificado exitosamente`});

    } catch (error) {
        res.status(500).json({ success: false, message: `Error al modificar el estado: ${error.message}`});
    }
};

const EliminarEstado = async (req, res) => {
    try {
        const {idEstado} = req.params;

        const errores = validarCampos({
            idEstado: {valor: idEstado, requerido: true, esNumero: true}
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await Estado.eliminarrEstado(idEstado);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: `Estado con id ${idEstado} eliminado exitosamente`});

    } catch (error) {
        res.status(500).json({ success: false, message: `Error al eliminar Estado: ${error.message}`});
    }
}

module.exports = { obtenerEstados, crearEstado, modificarEstado, EliminarEstado }

