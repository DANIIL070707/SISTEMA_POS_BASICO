import { getConnection } from "../database/connection.js";


export const getPersonasTabla = async (req, res )=> {
  try {
    const pool = await getConnection();
    const request = pool.request();
    const result = await request.execute("SP_TRAER_PERSONAS_TABLA");
    if (result.rowsAffected > 0) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(403).json({ message: "Personas no encontradas" });
    }
  } catch (error) {
    return res.status(404).json(error);
  }

}
export const createPersona = async (req, res) => {
  const { nombres, apellidos, telefono } = req.body;

  try {
    const pool = await getConnection();
    const request = pool.request();

    request.input("nombres", nombres);
    request.input("apellidos", apellidos);
    request.input("telefono", telefono);

    const result = await request.execute("SP_CREAR_PERSONA");

    if (result.rowsAffected > 0) {
      return res.status(201).json({ message: "Persona registrada" });
    } else {
      return res
        .status(404)
        .json({ message: "La persona no pudo ser registrada" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};


export const updatePersona =async (req, res) => {
    const { nombres, apellidos, telefono } = req.body;
    const id_persona = req.params.id_persona;
    try {

        const pool = await getConnection();
        const request = pool.request();

        request.input("id_persona", id_persona);
        request.input("nombres", nombres);
        request.input("apellidos", apellidos);
        request.input("telefono", telefono);
    
        const result = await request.execute("SP_ACTUALIZAR_PERSONA");
    
        if (result.rowsAffected > 0) {
          return res.status(200).json({ message: "Persona actualizada" });
        } else {
          return res
            .status(404)
            .json({ message: "La persona no pudo ser actualizar" });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}


export const deletePersona = async (req, res) => {
    const id_persona = req.params.id_persona;
    try {
        const pool = await getConnection();
        const request = pool.request();

        request.input("id_persona", id_persona);
        const result = await request.execute("SP_ELIMINAR_PERSONA");
        
        if (result.rowsAffected > 0) {
            return res.status(200).json({ message: "Persona eliminada" });
          } else {
            return res
              .status(404)
              .json({ message: "La persona no pudo ser eliminada" });
          }
    } catch (error) {
        return res.status(500).json(error);
    }
}