import React, {createContext, useState, useContext} from 'react';

import { productosParacompras, compraConfirmada , getCompras} from '../components/api/compras';

export const ComprasContext = createContext()


export const useComprasAuth = () => {
    const context = useContext(ComprasContext);
    if(!context){
        throw new Error("useComprasAuth debe usarse dentro de un ComprasProvider");
    }

    return context;
}


export const ComprasProvider = ({children}) =>{
 
    const [productosVenta, setproductosVenta] = useState([]);
    const [errorss, setErrors] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [messageOk, setMessageOk] = useState("");
    const [ok, setOk] = useState(false);
    const [comprasList, setComprasList] = useState([])
  

    const getProductosVentas = async () => {
        try {
          const res = await productosParacompras();
          setproductosVenta(res.data);
          console.log(res.data)
        } catch (error) {
          console.log(error);
        }
      };


      const compra = async (formdData) => {
        try {
          const res = await compraConfirmada(formdData)
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
      }


      const comprasGet = async () => {
        try {
          const res = await getCompras();
          setComprasList(res.data);
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <ComprasContext.Provider
          value={{
         getProductosVentas,
         productosVenta,
         compra,
         ok,
        messageError,
        messageOk,
        errorss,
        comprasGet,
        comprasList
          }}
        >
          {children}
        </ComprasContext.Provider>
      );
}