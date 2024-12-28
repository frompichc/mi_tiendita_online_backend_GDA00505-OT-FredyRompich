const validarCampos = (campos) => {
    const errores = [];

    for (const [campo, reglas] of Object.entries(campos)) {
        const valor = reglas.valor;
        if (reglas.requerido && !valor) {
            errores.push(`El campo ${campo} es obligatorio`);
        }

        if (reglas.esNumero && (valor !== undefined && valor !== null && isNaN(Number(valor)))) {
            errores.push(`El campo ${campo} debe ser un número válido`);
        }

        if (reglas.longitudMin && valor.length < reglas.longitudMin) {
            errores.push(`El campo ${campo} debe tener al menos ${reglas.longitudMin} caracteres`);
        }

        if (reglas.longitudMax && valor.length > reglas.longitudMax) {
            errores.push(`El campo ${campo} no debe exceder los ${reglas.longitudMax} caracteres`);
        }

        if (reglas.esCorreo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
            errores.push(`El campo ${campo} debe ser un correo electrónico válido`);
        }

        if (reglas.esFecha && isNaN(Date.parse(valor))) {
            errores.push(`El campo ${campo} debe ser una fecha válida`);
        }

        if (reglas.esDecimal && (valor !== undefined && valor !== null && !/^\d+(\.\d{1,2})?$/.test(valor))) {
            errores.push(`${nombreCampo} debe ser un número decimal válido`);
        }
    };

    return errores;
}

module.exports = { validarCampos };