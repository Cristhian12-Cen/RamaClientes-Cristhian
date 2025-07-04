const {Router} = require("express");
const { getTiposContribuyentes } = require("../controllers/tipos_contribuyentes");
const router = Router();

router.get('', getTiposContribuyentes);

module.exports=router;