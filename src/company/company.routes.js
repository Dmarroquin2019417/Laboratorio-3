import { Router } from "express";
import { check } from "express-validator";
import {
    getEmpresas,
    createEmpresa,
    filtrarEmpresas,
    ordenarEmpresas,
    editarEmpresa,
    excel
} from "./company.controller.js";
import {
    existenteNombreEmpresa
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js"

const router = Router();

// Ruta para obtener todas las empresas
router.get("/", 
[
    validarJWT,
], getEmpresas);

// Ruta para crear una nueva empresa
router.post(
    "/",
    validarJWT,
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
router.get("/filtrar", 
[
    validarJWT,
], filtrarEmpresas);

// Ruta para ordenar empresas
router.get("/ordenar", 
[
    validarJWT,
], ordenarEmpresas);

// Ruta para editar información de empresa
router.put("/:id",
[
    validarJWT,
], editarEmpresa);

router.get("/excel",
[
    validarJWT,
], excel);

export default router;
