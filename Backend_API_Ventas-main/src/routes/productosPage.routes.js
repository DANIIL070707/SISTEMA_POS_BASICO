import { Router } from "express";
import { getProductos, createProducto, updateProduto, activarProduto, desactivarProduto} from "../controllers/productosPage.js";
import { verificarToken } from "../middlewares/verificarToken.js";
const router = Router();

router.get('/getProductos',verificarToken, getProductos)
router.post('/createProducto',verificarToken, createProducto)
router.put('/updateProducto/:id_producto',verificarToken, updateProduto)
router.put('/activarProducto/:id_producto',verificarToken, activarProduto)
router.put('/desactivarProducto/:id_producto',verificarToken, desactivarProduto)


export default router