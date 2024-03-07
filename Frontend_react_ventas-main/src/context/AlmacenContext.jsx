import React, { createContext, useState, useContext } from "react";
import {
  getAlmacen,
  ingresarProductosAlmacen,
  updatExistencia,
  getProductosNoAlmacen,
} from "../components/api/almacen";

export const AlmacenContext = createContext();

export const useAlmacenAuth = () => {
  const context = useContext(AlmacenContext);
  if (!context) {
    throw new Error("useAlmacenAuth debe usarse dentro de un AlmacenProvider");
  }
  return context;
};


export const AlmacenProvider = ({ children }) => {
  const [almacenList, setAlmacenList] = useState([]);
  const [almacenNotList, setAlmacenNotList] = useState([]);
  const [errorss, setErrors] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageOk, setMessageOk] = useState("");
  const [ok, setOk] = useState(false)

  const almacenGet = async () => {
    try {
      const res = await getAlmacen();
      setAlmacenList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const almacenNotGet = async () =>{
    try {
      const res = await getProductosNoAlmacen();
      setAlmacenNotList(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  const Register = async (data) => {
    try {
      const res = await ingresarProductosAlmacen(data);
      console.log(res.data);
      setOk(true);
      setTimeout(() => {
        setOk(false); // Establecer el estado a su valor inicial (limpiar)
      }, 1000);

      return setMessageOk(res.data.message);
    } catch (error) {
      console.log(error.response.data.message);
      setErrors(true);
      setTimeout(() => {
        setErrors(false); // Establecer el estado a su valor inicial (limpiar)
      }, 1000);

      return setMessageError(error.response.data.message);
    }
  };


  const Update = async (data) => {
    try {
      const res = await updatExistencia(data);
      console.log(res.data);
      setOk(true);
      setTimeout(() => {
        setOk(false); // Establecer el estado a su valor inicial (limpiar)
      }, 1000);

      return setMessageOk(res.data.message);
    } catch (error) {
      console.log(error.response.data.message);
      setErrors(true);
      setTimeout(() => {
        setErrors(false); // Establecer el estado a su valor inicial (limpiar)
      }, 1000);

      return setMessageError(error.response.data.message);
    }
  };
  return (
    <AlmacenContext.Provider
      value={{
        almacenGet,
        almacenList,
        almacenNotGet,
        almacenNotList,
        Register,
        errorss,
        ok,
        messageError,
        messageOk,
        Update
      }}
    >
      {children}
    </AlmacenContext.Provider>
  );
};
