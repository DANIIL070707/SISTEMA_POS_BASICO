import React, { createContext, useContext, useState} from "react";
import { getUsers, getRoles , getEstados, userRegister, userUpdate, deleteUser, getPersonas} from "../components/api/users";

export const UsersContext = createContext();

export const useUserAuth = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUserAuth must be used within a UsersProvider");
  }
  return context;
};

export const UsersProvider = ({ children }) => {

const [userList, setUserLits] = useState([])
const [rolesList, setRolesList] = useState([])
const [estadosList, setEstadosList] = useState([])
const [personasList, setPersonasList] = useState([])
const [errorss, setErrors] = useState(false);
const [messageError, setMessageError] = useState("");
const [messageOk, setMessageOk] = useState("");
const [ok, setOk] = useState(false)

  const get = async () =>{
    try {
        const res = await getUsers()
        setUserLits(res.data)
    } catch (error) {
        console.log(error)
    }
  
  }

  const getPersonasSelect = async () =>{
    try {
        const res = await getPersonas()
        setPersonasList(res.data)
    } catch (error) {
        console.log(error)
    }
  
  }


  const getRolesSelect = async ()=>{

    try {
      const res = await getRoles()
      setRolesList(res.data)

    } catch (error) {
      console.log(error)
    }

  }

  const getEstadosSelect = async ()=>{

    try {
      const res = await getEstados()
      setEstadosList(res.data)

    } catch (error) {
      console.log(error)
    }

  }

  const Register = async (user) =>{
    try {
      const res = await userRegister(user)
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


  const Update = async (id, user) =>{


    console.log(`estoy mandando el ${id}`)
    console.log(`estoy mandando el ${user}`)
    try {
      const res = await userUpdate(id, user)
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
  
  const EliminarUsuario = async (id) =>{


    console.log(`estoy mandando el ${id}`)
   
    try {
      const res = await deleteUser (id)
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
  // Providing the context value using the Provider
  return (
    <UsersContext.Provider
      value={{
      get,
      userList,
      getRolesSelect,
      rolesList,
      Register,
      errorss,
      messageError,
      messageOk,
      ok,
      getEstadosSelect,
      estadosList,
      Update,
      EliminarUsuario,
      getPersonasSelect,
      personasList
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

