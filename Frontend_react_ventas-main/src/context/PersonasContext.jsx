// PersonasContext.js
import React, { createContext, useContext, useState } from "react";
import { getPersonas, registerPersona , updatePersona, deletePersona} from "../components/api/personas.js";

export const PersonasContext = createContext();

export const usePersonaAuth = () => {
  const context = useContext(PersonasContext);

  if (!context) {
    throw new Error("usePersonaAuth debe usarse dentro de un PersonasProvider");
  }
  return context;
};

export const PersonasProvider = ({ children }) => {
  const [ppersonasList, setPersonasList] = useState([]);
  const [errorss, setErrors] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageOk, setMessageOk] = useState("");
  const [ok, setOk] = useState(false)
  const get = async () => {
    try {
      const res = await getPersonas();
      setPersonasList(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const Register = async(persona) => {
    try {
      const res = await registerPersona(persona)
      console.log(res.data)
      setOk(true)
      setTimeout(() => {
        setOk(false); // Establecer el estado a su valor inicial (limpiar)
      }, 1000);
     
      return setMessageOk(res.data.message)
    } catch (error) {

      console.log(error.response.data.message)
      setErrors(true)
      setTimeout(() => {
        setErrors(false); // Establecer el estado a su valor inicial (limpiar)
      }, 1000);

      return setMessageError(error.response.data.message);
    }
      
    
  }

  const Update = async (id_persona, persona) =>{


    console.log(`estoy mandando el ${id_persona}`)
    console.log(`estoy mandando el ${persona}`)
    try {
      const res = await updatePersona(id_persona, persona)
      console.log(res.data)
      setOk(true)
      setTimeout(() => {
        setOk(false); // Establecer el estado a su valor inicial (limpiar)
      }, 1000);
     
      return setMessageOk(res.data.message)

    } catch (error) {
      console.log(error.response.data.message)
      setErrors(true)
      setTimeout(() => {
        setErrors(false); // Establecer el estado a su valor inicial (limpiar)
      }, 1000);

      return setMessageError(error.response.data.message);
    }
  }
  

  const EliminarPersona = async (id_persona) =>{


    console.log(`estoy mandando el ${id_persona}`)
   
    try {
      const res = await deletePersona (id_persona)
      console.log(res.data)
      setOk(true)
      setTimeout(() => {
        setOk(false); // Establecer el estado a su valor inicial (limpiar)
      }, 1000);
     
      return setMessageOk(res.data.message)

    } catch (error) {
      console.log(error.response.data.message)
      setErrors(true)
      setTimeout(() => {
        setErrors(false); // Establecer el estado a su valor inicial (limpiar)
      }, 1000);

      return setMessageError(error.response.data.message);
    }
  }
  // Proporcionando el valor de contexto mediante el Provider
  return (
    <PersonasContext.Provider
      value={{
        get,
        ppersonasList,
        Register,
        errorss,
        messageError,
        messageOk,
        ok,
        Update,
        EliminarPersona
      }}
    >
      {children}
    </PersonasContext.Provider>
  );
};
