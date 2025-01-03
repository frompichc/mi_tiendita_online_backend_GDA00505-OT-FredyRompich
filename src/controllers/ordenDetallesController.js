const OrdenDetalle = require('../models/ordenDetalleModel');


// Obtiene todas las órdenes
const obtenerOrdenDetalles = async (req, res) => {
    const { orden_idOrden = null } = req.query;
    try {
        const ordenDetalles = await OrdenDetalle.obtenerOrdenDetalles (orden_idOrden);
        res.status(200).json({ success: true, data: ordenDetalles});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al recuperar detalles de las ordenes: ${error.message}`});
    }
};


module.exports = { obtenerOrdenDetalles };