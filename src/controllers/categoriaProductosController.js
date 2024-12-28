const CategoriaProducto = require('../models/categoriaProductoModel');
const { validarCampos } = require('../helpers/validacionesCamposHelper');


const obtenerCategoriaProductos = async (req, res) => {
    try {
        const { idCategoriaProducto = null, estado_e_nombreEstado = null} = req.query
        const categoriaProductos = await CategoriaProducto.obtenerCategoriaProductos(idCategoriaProducto, estado_e_nombreEstado);
        res.status(200).json({ success: true, data: categoriaProductos});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al obtener las categorías de productos: ${error.message}`});
    }
};

const crearCategoriaProducto = async (req, res) => {
    try {
        const {nombre} = req.body;
        const errores = validarCampos({
            nombre: { valor: nombre, requerido: true }
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await CategoriaProducto.crearCategoriaProductos(req.body);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(201).json({ success: true, message: `Categoría de producto creada exitosamente`});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al crear la categoría de producto: ${error.message}`});
    }
};

const modificarCategoriaProducto = async (req, res) => {
    try {
        const {idCategoriaProducto} = req.params;
        const {nombre, estado_idEstado} = req.body;

        const errores = validarCampos({
            idCategoriaProducto: { valor: idCategoriaProducto, requerido: true, esNumero: true },
            nombre: { valor: nombre, requerido: true },
            estado_idEstado: { valor: estado_idEstado, requerido: true, esNumero: true }
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await CategoriaProducto.modificarCategoriaProductos(idCategoriaProducto, req.body);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: `Categoría de producto con id ${idCategoriaProducto} modificado exitosamente`});

    } catch (error) {
        res.status(500).json({ success: false, message: `Error al modificar la Categoría de producto: ${error.message}`});
    }

};

const eliminarCategoriaProducto = async(req, res) => {
    try {
        const {idCategoriaProducto} = req.params;

        const errores = validarCampos({
            idCategoriaProducto: { valor: idCategoriaProducto, requerido: true, esNumero: true }
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await CategoriaProducto.eliminarCategoriaProducto(idCategoriaProducto);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: 'Categoría de producto eliminado correctamente'});
    } catch (error) {
        res.status(500).json({success: false, message: `Error al eliminar Categoría de producto: ${error.message}`});
    }
};

module.exports = 
{ 
    obtenerCategoriaProductos,
    crearCategoriaProducto, 
    modificarCategoriaProducto, 
    eliminarCategoriaProducto 
}
