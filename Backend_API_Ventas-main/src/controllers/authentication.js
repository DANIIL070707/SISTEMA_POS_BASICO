import { getConnection } from "../database/connection.js";
import { createAccesToken } from "../libs/jwt.js";
import { enviarMail } from "../middlewares/emailLogin.js";
import { statusUser } from "../middlewares/verificarEstado.js";
import bycript from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const login = async (req, res) => {
  const { email, pass } = req.body;
  
  console.log(email);
  console.log(pass);
  const pool = await getConnection();
  //const userAgent = req.headers["user-agent"];
  const request = pool.request()
  request.input("email", email); // Reemplaza 'Email' con el nombre del parámetro en tu SP
  request.input("pass", pass); // Reemplaza 'Password' con el nombre del parámetro en tu SP
  const result = await request.execute("SP_SINGUP");

  //console.log(result.recordset[0].id_user);

  if (result.rowsAffected > 0) {
    const status = await statusUser(email);
    if (status == 1) {

      const isMatch = await bycript.compare(pass, result.recordset[0].pass)
      
      if(!isMatch) return res.status(400).json({message:"Contraseña Incorrecta"})

      const token = await createAccesToken({
        id: result.recordset[0].id_user,
        users_name: result.recordset[0].users_name,
        email: result.recordset[0].email,
        id_rol: result.recordset[0].id_rol,
        id_state: result.recordset[0].id_state,
      });

      res.cookie("token", token)
  //
      res.status(200).json({
        id: result.recordset[0].id_user,
        users_name: result.recordset[0].users_name,
        email: result.recordset[0].email,
        id_rol: result.recordset[0].id_rol,
        id_state: result.recordset[0].id_state,
      });


     
    //  console.log(token);
        //console.log(userAgent);
      
     enviarMail(email);
    } else {
      return res.status(403).json({ message: "Usuario inactivo" });
    }
  } else {
    return res.status(404).json({ message: "Credenciales incorrectas" });
  }
};



export const logout = async () =>{

  res.cookie('token',"",{
    expires: new Date(0)
  })
return res.sendStatus(400)
}

export const getUserToken = async(req, res)=>{

  const token = req.body.token
try {

const decoded = jwt.verify(token, 'secret') 
return res.status(202).json(decoded)

} catch (error) {
  return res.status(404).json({error})
}
}

export const verificarRolEnTiempo = async(req, res) => {
  const id_user = req.body.id
  try {
    const pool = await getConnection()
    const request = pool.request()
    request.input("id_user", id_user);
    const result = await  request.execute("SP_ROL_TIEMPO")
  
    if (result.rowsAffected > 0) {
      return res.status(200).json(result.recordset[0].id_rol);
    } else {
        return res.status(404).json({ message: "Registro no encontradas" });
    }
   } catch (error) {
    return res.status(500).json(error);
   }
}