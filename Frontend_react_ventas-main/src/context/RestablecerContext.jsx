import React, {createContext, useState, useContext} from 'react';
import { codigoEnviar, verificarCodigo , restablecerPass} from '../components/api/users';



export const RestablecerContext = createContext()


export const useRestablecerAuth = () => {
    const context = useContext(RestablecerContext);
    if(!context){
        throw new Error("useRestablecerAuth debe usarse dentro de un ComprasProvider");
    }

    return context;
}


export const RestablecerProvider = ({children}) =>{
 
    const [errorss, setErrors] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [messageOk, setMessageOk] = useState("");
    const [ok, setOk] = useState(false);
    
    const [codigo, setCodigo] = useState(false);
   
    const [enviado, setEnviado] = useState(false)

    const [restablecido, setRestablecido] = useState(false)

    
    const enviarCodigo = async  (data) => {
    
    try {
      const res = await codigoEnviar(data)
      console.log(res.data);
      setOk(true);
      setEnviado(true)
      setTimeout(() => {
        setOk(false); // Establecer el estado a su valor inicial (limpiar)
       // setEnviado(false)
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


          
    const codigoVerificar = async  (data) => {
    
      try {
        const res = await verificarCodigo(data)
        console.log(res.data);
        setOk(true);
        setCodigo(true)
       // setEnviado(true)
        setTimeout(() => {
          setOk(false); // Establecer el estado a su valor inicial (limpiar)
         // setEnviado(false)
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
 const restablecerContrasena = async (data) => {
  try {
    const res = await restablecerPass(data)
    console.log(res.data);
    setOk(true);
    setRestablecido(true)
   // setEnviado(true)
    setTimeout(() => {
      setOk(false); // Establecer el estado a su valor inicial (limpiar)
      
     // setEnviado(false)
    }, 1000);


    if(res.data.message == 'Contraseña actualizada') {
      setEnviado(false)
      setCodigo(false)
      setRestablecido(false)
      
    }
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
    return (
        <RestablecerContext.Provider
          value={{
       
         ok,
        messageError,
        messageOk,
        errorss,
        enviarCodigo,
        enviado,
        codigoVerificar,
        codigo,
        restablecerContrasena,
        restablecido
    
          }}
        >
          {children}
        </RestablecerContext.Provider>
      );
}