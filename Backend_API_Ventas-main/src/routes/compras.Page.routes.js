import { productosParaCompras , compraConfirmada, getCompras} from "../controllers/comprasPage.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import {Router} from 'express'
const router = Router()


router.get('/productosParaCompras',verificarToken, productosParaCompras)
router.get('/getCompras',verificarToken, getCompras)
router.post('/compraConfirmada',verificarToken, compraConfirmada)


export default router