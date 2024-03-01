const bcrypt = require('bcrypt');
const { response, json } = require('express');
const Usuario = require('./usuario');
const { generarJWT } = require("../helpers/generar-jwt");


// Resto del código del controlador aquí


const UsuarioPost = async (req, res = response) => {
    const { nombre, correo, password, role} = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (usuario) {
            return res.status(400).json({ msg: 'Ya existe un cliente con este correo' });
        }

        const salt = bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(password, salt);

        const nuevoUsuario = new Usuario({ nombre, correo, password: hashedPassword, role });
        if (cliente) {
            await Promise.all(cliente.map(async (clenteId) => {
                const cliente = await cliente.findById(clenteId);
                if (cliente) {
                    nuevoUsuario.cliente.push(clenteId);
                }
            }));
        }

        await nuevoUsuario.save();
        const token = await generarJWT(nuevoUsuario.id);

        res.status(200).json({
            msg: 'Cliente creado exitosamente',
            usuario: nuevoUsuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al crear el Cliente' });
    }
};

const estudiantesLogin = async (req, res) => {
    const { correo, password } = req.body;

    try{
        const estudiante = await Estudiante.findOne({ correo });

    if (!estudiante) {
        return res.status(400).json({
            msg: 'El Estudiante no sea encontrado'
        });
    }

    if(!estudiante.estado){
        return res.status(400).json({
            msg: 'Estudiante borrado de la base de datos'
        })
    }

    const passwordValido = bcryptjs.compareSync(password, estudiante.password);

    if (!passwordValido) {
        return res.status(400).json({
            msg: 'Contraseña incorrecta'
        });
    }

    const token = await generarJWT(estudiante.id)

    res.status(200).json({
        msg_1: 'Inicio de sesión exitosamente',
        msg_2: 'Welcome '+ estudiante.nombre,
        msg_3: 'Este su token =>'+ token,
    });

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: 'Eyy un error inesperado'
        })
    }

}


module.exports = {
    UsuarioPost,
    estudiantesLogin
};


