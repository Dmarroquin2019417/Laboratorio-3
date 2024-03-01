<<<<<<< HEAD
// Importar la biblioteca 'jsonwebtoken'
import jwt from 'jsonwebtoken';

// Función para generar un JWT (JSON Web Token)
export const generarJWT = (uid = ' ') => {
    // Devolver una promesa para manejar la generación del token de forma asíncrona
    return new Promise((resolve, reject) => {
        // Crear el payload del token con el ID del usuario
        const payload = { uid };

        // Firmar el token con la clave secreta y configuraciones adicionales
=======
const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
>>>>>>> 71b27106f49d63c73aa97d2f4e8d698543d4f420
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
<<<<<<< HEAD
                expiresIn: '1h' // Token expira en 1 hora
            },
            (err, token) => {
                // Si hay un error al generar el token, rechazar la promesa con un mensaje de error
                err ? (console.log(err), reject('No se pudo generar el token')) : resolve(token);
            }
        );
    });
=======
                expiresIn: '1h',
            },
        (err, token) =>{
            err ? (console.log(err),reject('Nose pudo generar token')) : resolve(token)
        }   
        )
    })
}

module.exports ={
    generarJWT
>>>>>>> 71b27106f49d63c73aa97d2f4e8d698543d4f420
}