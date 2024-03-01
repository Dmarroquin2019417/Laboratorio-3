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




