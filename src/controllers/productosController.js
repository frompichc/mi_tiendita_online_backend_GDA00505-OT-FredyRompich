const Producto = require('../models/productoModel');
const { validarCampos } = require('../helpers/validacionesCamposHelper');

const obtenerProductos = async (req, res) => {
    try {
       
        let {idProducto = null, estado_e_nombreEstado = null} = req.query;
        const productos = await Producto.obtenerProductos(idProducto, estado_e_nombreEstado);
        const productosConFotoBase64 = productos.map(producto => {
            if (producto.foto) {
                // Convertir el buffer binario de foto a base64
                producto.foto = producto.tipoImagen + producto.foto.toString('base64');
            }
            return producto;
        });
      
        res.status(200).json({ success: true, data: productosConFotoBase64});
    } catch (error) {
        res.status(500).json({ success: false, message: `Error al obtener los productos: ${error.message}`});
    }
};

const crearProducto = async (req, res) => {
    try {
        const
        {
            categoriaProducto_idCategoriaProducto,
            nombre,
            marca,
            codigo,
            stock,
            precio,
            foto = null,
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
        let tipoImagen = null;
        // Convertir Base64 a binario
        console.log(req.body.foto.slice(0,100));
        if (req.body.foto) {
            tipoImagen = req.body.foto.split(',')[0]+',';
            const base64Data = req.body.foto.split(',')[1];
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
                bufferFoto,
                tipoImagen
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
            estado_idEstado,
            precio,
            foto = null
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
        console.log('imprime esto', req.body.foto.slice(0,100));
        let bufferFoto = null;
        let tipoImagen = null;
        // Convertir Base64 a binario
        if (req.body.foto) {
            tipoImagen = req.body.foto.split(',')[0]+',';
            const base64Data = req.body.foto.split(',')[1];
            bufferFoto = Buffer.from(base64Data, 'base64'); // Convertir Base64 a binario
        }
        const mensaje = await Producto.modificarProducto(idProducto,
            {
                categoriaProducto_idCategoriaProducto,
                nombre,
                marca,
                codigo,
                stock,
                estado_idEstado,
                precio,
                bufferFoto,
                tipoImagen
    
            }
        );
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