import React, { useEffect } from "react";
import { createContext, useState, useContext } from "react";

import {
  LoginRequest,
  getUserToken,
  RolEnTiempo,
} from "../components/api/auth";
import Cookies from "js-cookie";


export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {

  //const [users, setUsers] = useState(null)
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [errorss, setErrors] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({});
  const [rol, setRol] = useState(0);
  const [roleAdmin, setRoleAdmin] = useState(false);
  const [roleVendedor, setRoleVendedor] = useState(false);
  const [roleCliente, setRoleCliente] = useState(false);


  const Acceso = async (user) => {

    try {
      const res = await LoginRequest(user);
      //  console.log(res.data)
      setIsAuthenticate(true);
      // setUser(res.data);
      setUsers(res.data);
      console.log(res);
    } catch (error) {
      console.log(error.response.data.message);
      setErrors(true);
      setTimeout(() => {
        setErrors(false); // Establecer el estado a su valor inicial (limpiar)
      }, 1000);

      return setMessageError(error.response.data.message);
    }
  };

  const Salir = async () => {
    Cookies.remove("token");
    setLoading(false);
    return setIsAuthenticate(false);
  };


  /*
useEffect(() => {
    if (errorss.length > 0) {
        const timer = setTimeout(() => {
            setErrors(false)
        }, 1000)

        return () => clearTimeout(timer)
    }
}, [errorss])
*/

  useEffect(() => {
    async function checkLogin() {
      const cookie = Cookies.get();
      //console.log(cookie)
      if (!cookie.token) {
        setIsAuthenticate(false);
        return setLoading(false);
      }

      return setIsAuthenticate(true);
    }

    checkLogin();
  }, []);

  useEffect(() => {
    const GetCokiee = Cookies.get();
    const sendCookie = GetCokiee.token;

    async function getUser() {
      const res = await getUserToken({ token: sendCookie });

      //  console.log(res.data.email)
      return setUsers(res.data);
    }

    getUser();
  }, []);

  useEffect(() => {
    const aGetCokiee = Cookies.get();
    const asendCookie = aGetCokiee.token;

    async function getUser2() {
      const res = await getUserToken({ token: asendCookie });
      const payload = {
        id: res.data.id,
      };
      console.log(payload);
      Rol(payload);
    }

    async function Rol(payload) {
      const res2 = await RolEnTiempo(payload);
      console.log(res2.data);
      setRol(res2.data);
    }

    getUser2();
  }, []);

  useEffect(() => {
    if (rol == 1) {
      setRoleVendedor(true);
      return setRoleAdmin(true);
    } else if (rol == 2) {
      return setRoleCliente(true);
    } else if (rol == 3) {
      return setRoleVendedor(true);
    }
    setRoleCliente(false);
    setRoleVendedor(false);
    return setRoleAdmin(false);
  }, [rol]);

  return (
    <AuthContext.Provider
      value={{
        Acceso,
        isAuthenticate,
        errorss,
        messageError,
        loading,
        Salir,
        users,
        getUserToken,
        roleAdmin,
        roleVendedor
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
