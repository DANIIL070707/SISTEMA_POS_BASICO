
import { getConnection } from "../database/connection.js";


export const statusUser = async (email) =>{

const pool = await getConnection()
const request = pool.request()

request.input('email', email)

const result = await request.execute("SP_VERIFICAR_STATUS")
console.log(result.recordsets[0][0].id_state)
return result.recordsets[0][0].id_state




}