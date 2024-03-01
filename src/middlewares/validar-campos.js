<<<<<<< HEAD
// Importar el módulo 'validationResult' de 'express-validator'
import { validationResult } from 'express-validator';

// Middleware para validar campos utilizando 'express-validator'
export const validarCampos = (req, res, next) => {
    // Obtener los errores de validación
    const errors = validationResult(req);
    
    // Verificar si existen errores
    if (!errors.isEmpty()) {
        // Responder con un código 400 y los errores de validación
        return res.status(400).json(errors);
    }

    // Si no hay errores, pasar al siguiente middleware
    next();
};
=======
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }

    next();
}

module.exports = {
    validarCampos
}
>>>>>>> 71b27106f49d63c73aa97d2f4e8d698543d4f420
