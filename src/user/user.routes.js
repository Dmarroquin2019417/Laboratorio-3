const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, esRolValido } = require('../helpers/db-validators');
const { usuariosPost, usuariosGet } = require('../controllers/user.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get("/", (req, res) => {
    // Lógica de manejo de la solicitud aquí
});

router.post("/", (req, res) => {
    [
        validarJWT,
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min: 6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRolValido),
        validarCampos,
    ], usuariosPost 
});


module.exports = router;

