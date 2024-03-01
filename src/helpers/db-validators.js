<<<<<<< HEAD
import Admin from '../admin/admin.model.js';
import Empresa from '../company/company.model.js';

export const existenteEmail = async (correo = '') => {
    const existeEmail = await Admin.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existenteNombreEmpresa = async (nombre = '') => {
    const existeEmpresa = await Empresa.findOne({ nombre });
    if (existeEmpresa) {
        throw new Error(`La empresa ${nombre} ya está registrada`);
    }
};




=======
const Usuario = require('../models/usuario');


const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El role ${ role } no existe en base de datos.` )
    }
}

module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido
}
>>>>>>> 71b27106f49d63c73aa97d2f4e8d698543d4f420
