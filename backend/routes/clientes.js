const { Router } = require("express");
const { getController, postController, putController, deleteController, getIdController } = require("../controllers/clientes");
const { check } = require("express-validator");
const { validar } = require("../middlewares/validarCampos");
const { existeClienteId, existeCiudadId, existeEmpresaId, existeTipoDocumentoId, existeTipoContribuyenteId } = require("../helpers/validacionesBD");

const { validarJWT } = require("../middlewares/validarJWT");
const { esAdminRol } = require("../middlewares/validarRol");

const router = Router();

router.get('', getController);

router.post('', [
    check('razon_social', 'La razon social es obligatorio').not().isEmpty(),
    check('numero_identificacion', 'El número de identificación es obligatorio').not().isEmpty(),
    check('direccion', 'La dirección es obligatoria').not().isEmpty(),
    check('telefono', 'El número de teléfono es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('cuenta_local', 'La cuenta local es obligatoria').not().isEmpty(),
    check('cuenta_extranjera', 'La cuenta extranjera es obligatoria').not().isEmpty(),  
    check('id_tipo_documento', 'El tipo de documento es obligatorio').not().isEmpty(),
    check('id_tipo_documento').custom(existeTipoDocumentoId),
    check('id_tipo_contribuyente', 'El tipo de contribuyente es obligatorio').not().isEmpty(),
    check('id_tipo_contribuyente').custom(existeTipoContribuyenteId),
    check('id_ciudad', 'La ciudad es obligatoria').not().isEmpty(),
    check('id_ciudad').custom(existeCiudadId),
    check('id_empresa', 'La empresa es obligatoria').not().isEmpty(),
    check('id_empresa').custom(existeEmpresaId),
    validar,
    // validarJWT
], postController);

router.put('/:id', [
    check('id').custom(existeClienteId),
    check('razon_social', 'La razon social es obligatorio').not().isEmpty(),
    check('id_tipo_documento').custom(existeTipoDocumentoId),
    check('id_tipo_contribuyente').custom(existeTipoContribuyenteId),
    check('id_ciudad').custom(existeCiudadId),
    check('id_empresa').custom(existeEmpresaId),
    validar,
    // validarJWT
], putController);

router.delete('/:id', [
    check('id').custom(existeClienteId),
    validar,
    // validarJWT,
    // esAdminRol
], deleteController);

router.get('/:id', [
    check('id').custom(existeClienteId),
    validar,
    // validarJWT,
    // esAdminRol
], getIdController);

module.exports = router;