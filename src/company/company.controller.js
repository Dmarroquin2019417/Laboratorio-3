import { response, request } from "express";
import XLSX from "xlsx";
import Empresa from './company.model.js';
import fs from "fs";

export const getEmpresas = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, empresas] = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        empresas,
    });
}

export const createEmpresa = async (req, res) => {
    const { nombre, nivelImpacto, añosTrayectoria, categoriaEmpresarial } = req.body;
    const empresa = new Empresa({ nombre, nivelImpacto, añosTrayectoria, categoriaEmpresarial });

    try {
        await empresa.save();

        res.status(200).json({
            empresa,
        });
    } catch (error) {
        console.error("Error al crear empresa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}


export const filtrarEmpresas = async (req, res) => {
    const { criterio } = req.query;
    const query = { estado: true };

    try {
        switch (criterio) {
            case 'años':
                query.añosTrayectoria = { $gte: 5 }; 
                break;
            case 'nivel':
                query.nivelImpacto = 'Alto'; 
                break;
      
        }

        const empresasFiltradas = await Empresa.find(query);
        res.status(200).json(empresasFiltradas);
    } catch (error) {
        console.error("Error al filtrar empresas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const ordenarEmpresas = async (req, res) => {
    const { criterio } = req.query;

    try {

        let empresasOrdenadas;
        switch (criterio) {
            case 'años':
                empresasOrdenadas = await Empresa.find().sort({ añosTrayectoria: 1 }); 
                break;
            case 'nombre':
                empresasOrdenadas = await Empresa.find().sort({ nombre: 1 }); 
                break;
      
        }

        res.status(200).json(empresasOrdenadas);
    } catch (error) {
        console.error("Error al ordenar empresas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export const editarEmpresa = async (req, res) => {
    const { id } = req.params;
    const { nombre, nivelImpacto, añosTrayectoria, categoriaEmpresarial } = req.body;

    try {
        const empresaEditada = await Empresa.findByIdAndUpdate(id, { nombre, nivelImpacto, añosTrayectoria, categoriaEmpresarial }, { new: true });
        res.status(200).json(empresaEditada);
    } catch (error) {
        console.error("Error al editar empresa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export async function excel(req = request, res = response) {
    try {
        const data = await Empresa.find({});
 
        const datas = data.map(Empresa => ({
            nombre: Empresa.nombre,
            nivelImpacto: Empresa.nivelImpacto,
            añosTrayectoria: Empresa.añosTrayectoria,
            categoriaEmpresarial: Empresa.categoriaEmpresarial,
            estado: Empresa.estado ? 'Activa' : 'Inactiva'
        }));
 
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(datas);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
        const fileName = 'gestor.xlsx';
        const filePath = `./temp/${fileName}`;
 
        XLSX.writeFile(wb, filePath);
 
        console.log('Datos exportados correctamente a', fileName);
 
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Error al enviar archivo:', err);
            } else {
                console.log('Archivo enviado a carpeta temp, por favor de revisarla, el nombre del archivo es:', filePath);
            }
            });
    } catch (error) {
        console.error('Error al exportar datos a Excel:', error);
        res.status(500).json({ error: 'Error al exportar datos a Excel' });
    }
};

