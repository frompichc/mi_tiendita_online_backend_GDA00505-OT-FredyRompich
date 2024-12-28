const Cliente = require('../models/clienteModel');
const { validarCampos } = require('../helpers/validacionesCamposHelper');

const obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.obtenerClientes();
        res.status(200).json({ success: true, data: clientes});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al obtener los clientes: ${error.message}`});
    }
};

const crearCliente = async (req, res) => {
    try {
        const 
        {
            razon_social, 
            nombre_comercial, 
            direccion_entrega, 
            telefono, 
            email
        } = req.body;
        
        const errores = validarCampos({
            razon_social: {valor: razon_social, requerido: true},
            nombre_comercial: {valor: nombre_comercial, requerido: true},
            direccion_entrega: {valor: direccion_entrega, requerido: true},
            telefono: {valor: telefono, requerido: true, esNumero: true, longitudMin: 8, longitudMax: 8},
            email: {valor: email, requerido: true, esCorreo: true}
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await Cliente.crearCliente(req.body);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(201).json({ success: true, message: 'Cliente creado exitosamente'});

    } catch (error) {
        res.status(500).json({ success: false, message: `Error al crear cliente: ${error.message}`});
    }
};

const modificarCliente = async (req, res) => {
    try {
        const {idCliente} = req.params;
        const 
        {
            razon_social, 
            nombre_comercial, 
            direccion_entrega, 
            telefono, 
            email,
            estado_idEstado
        } = req.body;

        const errores = validarCampos({
            idCliente: {valor: idCliente, requerido: true, esNumero: true},
            razon_social: {valor: razon_social, requerido: true},
            nombre_comercial: {valor: nombre_comercial, requerido: true},
            direccion_entrega: {valor: direccion_entrega, requerido: true},
            telefono: {valor: telefono, requerido: true, esNumero: true, longitudMin: 8, longitudMax: 8},
            email: {valor: email, requerido: true, esCorreo: true},
            estado_idEstado: {valor: estado_idEstado, requerido: true, esNumero: true}
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await Cliente.modificarCliente(idCliente, req.body);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: `Cliente con id ${idCliente} modificado exitosamente`});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al modificar cliente: ${error.message}`});
    }
};

const eliminarCliente = async(req, res) => {
    try {
        const {idCliente} = req.params;

        const errores = validarCampos({
            idCliente: {valor: idCliente, requerido: true, esNumero: true}
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await Cliente.eliminarCliente(idCliente);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: 'Cliente eliminado correctamente'});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al eliminar Cliente: ${error.message}`});
    }
};

module.exports = { obtenerClientes, crearCliente, modificarCliente, eliminarCliente }