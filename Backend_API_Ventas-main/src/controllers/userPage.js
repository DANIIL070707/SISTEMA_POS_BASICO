import { getConnection } from "../database/connection.js";
import bycript from "bcryptjs";
import { enviarMailCodigo } from "../middlewares/emailLogin.js";

export const getUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const request = pool.request();
    const result = await request.execute("SP_TRAER_USUARIOS");

    if (result.rowsAffected > 0) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(403).json({ message: "Usuarios no encontrados" });
    }
  } catch (error) {}

  return res.status(404).json(error);
};

export const updateUser = async (req, res) => {
  const id = req.params.id_user;
  //console.log(id);
  const { users_name, email, pass, id_rol, id_state } = req.body;
  //console.log(pass);
  const salt = bycript.genSaltSync();
  const hash = pass == null  || pass == '' ? 1 : bycript.hashSync(pass, salt);
  
console.log(req.body);
  try {
    const pool = await getConnection();
    const request = pool.request();
    request.input("id", id);
    request.input("username", users_name);
    request.input("email", email);
    request.input("password", hash);
    request.input("rol", id_rol);
    request.input("status", id_state);
  console.log(`aqui va el ${hash}`)
 
 
    const result = await (hash == 1  ? request.execute("SP_ACTUALIZAR_USUARIO_NOPASS") : request.execute("SP_ACTUALIZAR_USUARIO"));

    if (result.rowsAffected > 0) {
      return res
        .status(200)
        .json({ message: "El usuario ha sido actualizado" });
    } else {
      return res
        .status(404)
        .json({ message: "El usuario no ha sido actualizado" });
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id_user;

  try {
    const pool = await getConnection();
    const request = pool.request();

    request.input("id", id);
    const result = await request.execute("SP_ELIMINAR_USUARIO");

    if (result.rowsAffected > 0) {
      return res.status(200).json({ message: "Usuario elminado" });
    } else {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getRoles = async (req, res) => {
  try {
    const pool = await getConnection();
    const request = pool.request();

    const result = await request.execute("SP_TRAER_ROLES");

    if (result.rowsAffected > 0) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(403).json({ message: "Roles no encontrados" });
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const getEstados = async (req, res) => {
  try {
    const pool = await getConnection();
    const request = pool.request();
    const result = await request.execute("SP_TRAER_ESTADOS");
    if (result.rowsAffected > 0) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(403).json({ message: "Roles no encontrados" });
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const registerUser = async (req, res) => {
  const { id_persona, users_name, email, pass, id_rol } = req.body;
  const salt = bycript.genSaltSync(10);
  const hash = bycript.hashSync(pass, salt);
  try {
    const pool = await getConnection();
    const request = pool.request();

    request.input("email", email);

    const result = await request.execute("SP_VERIFICAR_EMAIL");

    if (result.rowsAffected > 0) {
      return res
        .status(500)
        .json({ message: "Ya existe un usuario con ese email" });
    } else {
      const request2 = pool.request();
      request2.input("id_persona", id_persona);
      request2.input("user_name", users_name);
      request2.input("email", email);
      request2.input("pass", hash);
      request2.input("id_rol", id_rol);
      const result2 = await request2.execute("SP_REGISTRAR_USUARIO");

      if (result2.rowsAffected > 0) {
        return res.status(201).json({ message: "Usuario creado" });
      } else {
        return res.status(500).json({ message: "Usuario no creado" });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPersonas = async (req, res) => {
  try {
    const pool = await getConnection();
    const request = pool.request();
    const result = await request.execute("SP_TRAER_PERSONAS");
    if (result.rowsAffected > 0) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(403).json({ message: "Personas no encontradas" });
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const enviarCodigo = async (req,res)=>{
  const {email} = req.body;

  const userAgent = req.useragent;
  ///const country = response.data.country;
  const platform = userAgent.platform;
  const browser = userAgent.browser;
  console.log(email)
  let codigo = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const longitud = 5;

  for (let i = 0; i < longitud; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  try {
    const pool = await getConnection();
    const request = pool.request();

    request.input("email", email);

  const result = await request.execute("SP_VERIFICAR_EMAIL");
    if (result.rowsAffected > 0) {
      const request2 = pool.request();
      request2.input("email", email);
      const result2 = await request2.execute("SP_VERIFICAR_EMAIL_TBL_CODIGOS");

      if(result2.rowsAffected > 0) {
        const request3 = pool.request();
        request3.input("codigo", codigo);
        request3.input("email", email);
        console.log(codigo)
        const result3 = await request3.execute("SP_ENVIAR_CODIGO");

        if(result3.rowsAffected > 0) {
          enviarMailCodigo(codigo, email, platform, browser)
        console.log('Sending')
          return res.status(201).json({ message: "Codigo enviado" });
        }else{
          return res.status(404).json({ message: "Codigo no enviado" });
        }
      }else{
      

        const request4 = pool.request();

        request4.input("codigo", codigo);
        request4.input("email", email);
        console.log(codigo)
        const result4 = await request4.execute("SP_ENVIAR_CODIGO_INSERT");

        if(result4.rowsAffected > 0) {
        enviarMailCodigo(codigo, email)
        console.log('Sending')
          return res.status(201).json({ message: "Codigo enviado" });
        }else{
          return res.status(404).json({ message: "Codigo no enviado" });
        }


      }
    } else {
      console.log(result)
      return res.status(404).json({ message: "No existe usuario con ese correo" });
    }
  
  } catch (error) {
    return res.status(500).json(`^Error: ${error}`);
  }
}

export const verificarCodigo = async (req, res) => {
  const {email, codigo} = req.body
  try {
    const pool = await getConnection();
    const request = pool.request();
         request.input("codigo", codigo);
        request.input("email", email);
    const result = await request.execute("SP_VERIFICAR_CODIGO");
    if (result.rowsAffected > 0) {
      return res.status(200).json({ message: "Codigo verificado" });
    } else {
      return res.status(403).json({ message: "Codigo no verificado" });
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const restablecerContraseña = async (req, res) => {
  const {email, pass1, pass2} = req.body
  console.log(req.body)
  try {

    if(pass1 !== pass2) return res.status(404).json({message:"Las contraseñas deben ser iguales"})
    const salt = bycript.genSaltSync(10);
    const hash = bycript.hashSync(pass1, salt);
    const pool = await getConnection();
    const request = pool.request();
         request.input("pass", hash);
        request.input("email", email);
    const result = await request.execute("SP_RESTABLECER_CONTRASENA");
    if (result.rowsAffected > 0) {
      return res.status(200).json({ message: "Contraseña actualizada" });
    } else {
      return res.status(403).json({ message: "No se pudo actualizar la contraseña" });
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};