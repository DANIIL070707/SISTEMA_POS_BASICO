import { Router } from "express";
import { getPersonas } from "../controllers/userPage.js";
import { createPersona, updatePersona , deletePersona, getPersonasTabla} from "../controllers/personasPage.js";
import { verificarToken } from "../middlewares/verificarToken.js";
const router = Router()


router.get('/getPersonasTabla',verificarToken, getPersonasTabla)
router.post('/createPersona',verificarToken, createPersona)
router.put('/updatePersona/:id_persona',verificarToken, updatePersona)
router.delete('/deletePersona/:id_persona',verificarToken, deletePersona)


export default router;