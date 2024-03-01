import bcryptjs from 'bcryptjs';
import Administrador from '../admin/admin.model.js'
import { generarJWT } from '../helpers/generar-jwt.js'; 

export const login = async (req, res) => {
    const { correo, password } = req.body;

  try {
    //verificar si el email existe:
    const administrador = await Administrador.findOne({ correo });

    if (!administrador) {
      return res.status(400).json({
        msg: "Credenciales incorrectas, Correo no existe en la base de datos",
      });
    }
    //verificar si el ususario está activo
    if (!administrador.estado) {
      return res.status(400).json({
        msg: "El administrador no existe en la base de datos",
      });
    }
    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, administrador.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "La contraseña es incorrecta",
      });
    }
    //generar el JWT
    const token = await generarJWT( administrador.id);

    res.status(200).json({
      msg: 'Login Exitoso!!!',
      administrador,
      token
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Comuniquese con el administrador",
    });
  }
}