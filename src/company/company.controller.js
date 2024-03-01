import { response, request } from "express";
import Empresa from './company.model.js';

export const getEmpresas = async (req = request, res = response) => {
    const { limite = 10, desde = 0 } = req.query; // Valores predeterminados de límite y desde
    const query = { estado: true };

    try {
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
    } catch (error) {
        console.error("Error al obtener empresas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
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
        // Aplicar lógica de filtrado según el criterio especificado
        switch (criterio) {
            case 'años':
                query.añosTrayectoria = { $gte: 5 }; // Por ejemplo, filtrar empresas con más de 5 años de trayectoria
                break;
            case 'nivel':
                query.nivelImpacto = 'Alto'; // Por ejemplo, filtrar empresas con nivel de impacto alto
                break;
            // Agrega más casos según los criterios que necesites
        }

        const empresasFiltradas = await Empresa.find(query);
        res.status(200).json(empresasFiltradas);
    } catch (error) {
        console.error("Error al filtrar empresas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Ordenar empresas según un criterio específico
export const ordenarEmpresas = async (req, res) => {
    const { criterio } = req.query;

    try {
        // Aplicar lógica de ordenamiento según el criterio especificado
        let empresasOrdenadas;
        switch (criterio) {
            case 'años':
                empresasOrdenadas = await Empresa.find().sort({ añosTrayectoria: 1 }); // Por ejemplo, ordenar por años de trayectoria ascendente
                break;
            case 'nombre':
                empresasOrdenadas = await Empresa.find().sort({ nombre: 1 }); // Por ejemplo, ordenar por nombre de empresa en orden alfabético
                break;
            // Agrega más casos según los criterios que necesites
        }

        res.status(200).json(empresasOrdenadas);
    } catch (error) {
        console.error("Error al ordenar empresas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Editar la información de una empresa
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

