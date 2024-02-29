import bcryptjs from 'bcryptjs';
import { response, request } from "express";
import Usuario from './usuario.model.js';


export const getUsers = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, users] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        users,
    });
}

export const createUser = async (req, res) => {
    const { nombre, correo, password, role, phone } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role, phone });

    // Verifica si el correo ya existe en la base de datos

    // Encripta la contraseña
    const salt = bcryptjs.genSaltSync(); // Por defecto tiene 10 vueltas
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guarda los datos del nuevo usuario
    await usuario.save();

    res.status(200).json({
        usuario,
    });
}

