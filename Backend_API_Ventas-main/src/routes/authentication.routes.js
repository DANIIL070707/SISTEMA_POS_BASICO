
import {Router} from 'express'
import { login, logout, getUserToken, verificarRolEnTiempo } from "../controllers/authentication.js"
//import { statusUser } from '../middlewares/verificarEstado.js'
//import { statusUser } from '../middlewares/verificarEstado.js'

const router = Router()

router.post('/login',login)
router.post('/logout',logout)
router.post('/getUserToken', getUserToken)
router.post('/verificarRolEnTiempo',verificarRolEnTiempo)
export default router