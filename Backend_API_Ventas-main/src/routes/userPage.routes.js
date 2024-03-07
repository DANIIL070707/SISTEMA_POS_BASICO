import { Router } from "express";
import { getUsers, updateUser, deleteUser, getRoles, registerUser, getEstados, getPersonas, enviarCodigo,
verificarCodigo, restablecerContraseña} from "../controllers/userPage.js"
import { verificarToken } from "../middlewares/verificarToken.js";
const router = Router()

router.get('/getUsers',verificarToken, getUsers)
router.put('/updateUser/:id_user', verificarToken,updateUser)
router.delete('/deleteUser/:id_user',verificarToken, deleteUser)
router.get('/getRoles',verificarToken, getRoles)
router.get('/getEstados',verificarToken, getEstados)
router.get('/getPersonas',verificarToken, getPersonas)
router.post('/verificarCodigo', verificarCodigo)
router.post('/registerUser',verificarToken, registerUser)
router.post('/enviarCodigo', enviarCodigo)
router.post('/restablecerContrasena', restablecerContraseña)
export default router;