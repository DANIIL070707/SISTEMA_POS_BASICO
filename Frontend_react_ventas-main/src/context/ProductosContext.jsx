import React, { createContext, useState, useContext } from "react";
import {
  getPrdouctos,
  registerProducto,
  updateProducto,
  activarProducto,
  desactivarProducto,
} from "../components/api/productos";

export const ProductosContext = createContext();

export const useProductosAuth = () => {
  const context = useContext(ProductosContext);

  if (!context) {
    throw new Error(
      "useProductosAuth debe usarse dentro de un ProductosProvider"
    );
  }
  return context;
};

export const ProductosProvider = ({ children }) => {
  const [productosList, setProductosList] = useState([]);
  const [errorss, setErrors] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [messageOk, setMessageOk] = useState("");
  const [ok, setOk] = useState(false);

  const get = async () => {
    try {
      const res = await getPrdouctos();
      setProductosList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Register = async (data) => {
    try {
      const res = await registerProducto(data);
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

  const Update = async (id_producto, data) => {
    try {
      const res = await updateProducto(id_producto, data);
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

  const enabledProducto = async (id_producto) => {
    try {
      const res = await activarProducto(id_producto);
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

  const disabledProducto = async (id_producto) => {
    try {
      const res = await desactivarProducto(id_producto);
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
    <ProductosContext.Provider
      value={{
        get,
        productosList,
        Register,
        ok,
        messageError,
        messageOk,
        errorss,
        Update,
        enabledProducto,
        disabledProducto
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
