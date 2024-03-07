import { Router } from "express";
import { ingresarProductoAlmacen, updateExistencia, getProductosNoAlmacen, getAlmacen } from "../controllers/almacenPage.js";
import { verificarToken } from "../middlewares/verificarToken.js";
const router = Router()

router.post('/ingresarProductoAlmacen',verificarToken, ingresarProductoAlmacen)
router.put('/updateExistencia',verificarToken, updateExistencia)
router.get('/getProductosNoAlmacen',verificarToken, getProductosNoAlmacen)
router.get('/getAlmacen',verificarToken, getAlmacen)

export default router