import { Router } from "express";
import { check } from "express-validator";
import {
    getEmpresas,
    createEmpresa,
    filtrarEmpresas,
    ordenarEmpresas,
    editarEmpresa
} from "./company.controller.js";
import { existenteNombreEmpresa } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

// Ruta para obtener todas las empresas
router.get("/", getEmpresas);

// Ruta para crear una nueva empresa
router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("nivelImpacto", "El nivel de impacto es obligatorio").not().isEmpty(),
        check("añosTrayectoria", "Los años de trayectoria son obligatorios").not().isEmpty(),
        check("añosTrayectoria", "Los años de trayectoria deben ser un número").isInt(),
        check("categoriaEmpresarial", "La categoría empresarial es obligatoria").not().isEmpty(),
        check("nombre").custom(existenteNombreEmpresa), // Validar nombre de empresa único
        validarCampos,
    ],
    createEmpresa
);

// Ruta para filtrar empresas
router.get("/filtrar", filtrarEmpresas);

// Ruta para ordenar empresas
router.get("/ordenar", ordenarEmpresas);

// Ruta para editar información de empresa
router.put("/:id", editarEmpresa);

export default router;
