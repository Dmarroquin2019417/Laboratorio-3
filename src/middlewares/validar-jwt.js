<<<<<<< HEAD
// Importar la biblioteca 'jsonwebtoken'
import jwt from 'jsonwebtoken';
// Importar el modelo de Usuario
import Usuario from '../admin/admin.model.js';

// Middleware para validar un token JWT en una petición
export const validarJWT = async (req, res, next) => {
    // Obtener el token de la cabecera de la petición
    const token = req.header("x-token");

    // Verificar si no hay token en la petición y devolver un error
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }

    try {
        // Verificación del token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el usuario correspondiente al UID
        const usuario = await Usuario.findById(uid);

        // Verificar que el usuario exista
        if (!usuario) {
            return res.status(401).json({
                msg: 'Admin no existe en la base de datos'
            });
        }

        // Verificar si el usuario está habilitado
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - admin con estado:false'
            });
        }

        // Agregar el usuario al objeto de solicitud (req) para su uso posterior
        res.usuario = usuario;

        // Llamar a la siguiente función en la cadena de middlewares
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
}
=======
const jwt = require("jsonwebtoken");
const Usuario = require("../user/usuario");

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    //verificación de token
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);
    //verificar que el usuario exista.
    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario no existe en la base de datos",
      });
    }
    //verificar si el uid está habilidato.
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado:false",
      });
    }

    req.usuario = usuario;

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Token no válido",
      });
  }
};

module.exports = {
  validarJWT,
};
>>>>>>> 71b27106f49d63c73aa97d2f4e8d698543d4f420
