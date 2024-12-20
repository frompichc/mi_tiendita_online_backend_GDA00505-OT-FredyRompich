const Producto = require('../models/productoModel');
const { validarCampos } = require('../helpers/validacionesCamposHelper');

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.obtenerProductos();
        const productosConFotoBase64 = productos.map(producto => {
            if (producto.foto) {
                // Convertir el buffer binario de foto a base64
                producto.foto = producto.foto.toString('base64');
            }
            return producto;
        });
        console.log(productosConFotoBase64);
        res.status(200).json({ success: true, data: productosConFotoBase64});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al obtener los productos: ${error.message}`});
    }
};

const crearProducto = async (req, res) => {
    try {
        console.log('req.body:',req.body);
        const
        {
            categoriaProducto_idCategoriaProducto,
            nombre,
            marca,
            codigo,
            stock,
            precio,
            foto = null
        } = req.body;



        const errores = validarCampos({
            categoriaProducto_idCategoriaProducto: {valor: categoriaProducto_idCategoriaProducto, requerido: true, esNumero: true},
            nombre: {valor: nombre, requerido: true},
            marca: {valor: marca, requerido: true},
            codigo: {valor: codigo, requerido: true},
            stock: {valor: stock, requerido: true, esDecimal: true},
            precio: {valor: precio, requerido: true, esDecimal: true}
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }
        let bufferFoto = null;
        if (req.body.foto) {
            const base64Data = req.body.foto; // Foto recibida en Base64
            bufferFoto = Buffer.from(base64Data, 'base64'); // Convertir Base64 a binario
        }
     
        const mensaje = await Producto.crearProducto(
            {
                
                    categoriaProducto_idCategoriaProducto,
                    nombre,
                    marca,
                    codigo,
                    stock,
                    precio,
                    bufferFoto
            }
        );
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(201).json({ success: true, message: "Producto insertado exitosamente"});

    } catch (error) {
        res.status(500).json({ success: false, message: `Error al crear producto: ${error.message}`});
    }
};

const modificarProducto = async (req, res) => {
    try {
        const {idProducto} = req.params;
        const
        {
            categoriaProducto_idCategoriaProducto,
            nombre,
            marca,
            codigo,
            stock,
            estado_idEstado = 1,
            precio,
            foto
        } = req.body;
        
        const errores = validarCampos({
            idProducto: {valor: idProducto, requerido: true, esNumero: true},
            categoriaProducto_idCategoriaProducto: {valor: categoriaProducto_idCategoriaProducto, requerido: true, esNumero: true},
            nombre: {valor: nombre, requerido: true},
            marca: {valor: marca, requerido: true},
            codigo: {valor: codigo, requerido: true},
            stock: {valor: stock, requerido: true, esDecimal: true},
            estado_idEstado: {valor: estado_idEstado, requerido: true, esNumero: true},
            precio: {valor: precio, requerido: true, esDecimal: true}
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await Producto.modificarProducto(idProducto, req.body);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: `Producto con id ${idProducto} modificado exitosamente`});

    } catch (error) {
        res.status(500).json({ success: false, message: `Error al modificar producto: ${error.message}`});
    }

};

const eliminarProducto = async (req, res) => {
    try {
        const {idProducto} = req.params;

        const errores = validarCampos({
            idProducto: {valor: idProducto, requerido: true, esNumero: true}
        });

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const mensaje = await Producto.eliminarProducto(idProducto);
        if (mensaje.includes('ERROR')) {
            return res.status(500).json({ success: false, message: mensaje});
        }
        res.status(200).json({ success: true, message: 'Producto eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al eliminar Producto: ${error.message}`});
    }
    
};



module.exports = { obtenerProductos, crearProducto, modificarProducto, eliminarProducto };