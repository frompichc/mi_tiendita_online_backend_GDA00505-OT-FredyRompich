const Orden = require('../models/ordenModel');
const { validarCampos } = require('../helpers/validacionesCamposHelper');


// Obtiene todas las órdenes
const obtenerOrdenes = async (req, res) => {
    const 
    {
        idOrden = null, 
        estado_e_nombreEstado = null, 
        estado_nombreEstado = null, 
        usuario_idUsuario = null 
    } = req.query;
    try {
        const ordenes = await Orden.obtenerOrdenes
        (
            idOrden, 
            estado_e_nombreEstado, 
            estado_nombreEstado, 
            usuario_idUsuario
        );
        res.status(200).json({ success: true, data: ordenes});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al recuperar información de las ordenes: ${error.message}`});
    }
};

// Crea una nueva orden con detalles
const crearOrden = async (req, res) => {
    try {
        const ordenConDetalle = req.body;

        const errores = validarCampos({
            usuario_idUsuario: { valor: ordenConDetalle.usuario_idUsuario, requerido: true, esNumero: true },
            direccion: { valor: ordenConDetalle.direccion, requerido: true },
            telefono: { valor: ordenConDetalle.telefono, requerido: true, esNumero: true, longitudMin: 8, longitudMax: 8 },
            correo_electronico: { valor: ordenConDetalle.correo_electronico, requerido: true, esCorreo: true },
            fecha_entrega: { valor: ordenConDetalle.fecha_entrega, requerido: true, esFecha: true },
            total_orden: { valor: ordenConDetalle.total_orden, requerido: true, esDecimal: true },
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const ordenConDetalleJSON = JSON.stringify(ordenConDetalle);

        const mensaje = await Orden.crearOrdenConDetalle(ordenConDetalleJSON);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(201).json({ success: true, message: 'Orden creada exitosamente'});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al crear la orden: ${error.message}`});
    }
};

// Modifica una orden existente
const modificarOrden = async (req, res) => {
    try {
        const { orden_idOrden } = req.params;
        const ordenConDetalle = req.body;

        const errores = validarCampos({
            orden_idOrden: { valor: orden_idOrden, requerido: true, esNumero: true},
            usuario_idUsuario: { valor: ordenConDetalle.usuario_idUsuario, requerido: true, esNumero: true },
            estado_idEstado: { valor: ordenConDetalle.estado_idEstado, requerido: true, esNumero: true },
            direccion: { valor: ordenConDetalle.direccion, requerido: true },
            telefono: { valor: ordenConDetalle.telefono, requerido: true, esNumero: true, longitudMin: 8, longitudMax: 8 },
            correo_electronico: { valor: ordenConDetalle.correo_electronico, requerido: true, esCorreo: true },
            fecha_entrega: { valor: ordenConDetalle.fecha_entrega, requerido: true, esFecha: true },
            total_orden: { valor: ordenConDetalle.total_orden, requerido: true, esDecimal: true },
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const ordenConDetalleJSON = JSON.stringify({
            ...ordenConDetalle,
            orden_idOrden: parseInt(orden_idOrden),
        });

        const mensaje = await Orden.modificarOrdenConDetalle(ordenConDetalleJSON);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: `Orden con id ${orden_idOrden} modificada exitosamente`});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al modificar la orden: ${error.message}`});
    }
};

const entregarOrden = async (req, res) => {
    try {
        const { idOrden } = req.params;
        const mensaje = await Orden.entregarOrdenConDetalle(idOrden);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: `Orden con id ${idOrden} entregada exitosamente`});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al entregar la orden: ${error.message}`});
    }
}

const rechazarOrden = async (req, res) => {
    try {
        const { idOrden } = req.params;
        const mensaje = await Orden.rechazarOrdenConDetalle(idOrden);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: `Orden con id ${idOrden} rechazada exitosamente`});

    } catch (error) {
        res.status(500).json({ success: false, message: `Error al rechazar la orden: ${error.message}`});
    }
}

module.exports = { obtenerOrdenes, crearOrden, modificarOrden, entregarOrden, rechazarOrden };