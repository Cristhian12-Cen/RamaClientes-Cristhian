const {Router} = require("express");
const { getTiposDocumentos } = require("../controllers/tipos_documentos");
const router = Router();

router.get('', getTiposDocumentos);

module.exports=router;