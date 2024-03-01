import bcryptjs from 'bcryptjs';
import { response, request } from "express";
import Admin from '../admin/admin.model.js';

export const getAdmins = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, admins] = await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        admins,
    });
}


export const createAdmin = async (req, res) => {
    const { nombre, correo, password, phone } = req.body;
    const admin = new Admin({ nombre, correo, password, phone });

    const salt = bcryptjs.genSaltSync(); 
    admin.password = bcryptjs.hashSync(password, salt);

    await admin.save();

    res.status(200).json({
        admin,
    });
}
