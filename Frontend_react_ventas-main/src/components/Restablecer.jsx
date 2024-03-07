import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/loginn.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useRestablecerAuth } from "../context/RestablecerContext";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from 'react-hook-form'


export default function Restablecer() {
    const Navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}} = useForm()

    const {enviado,codigoVerificar,restablecerContrasena, restablecido, enviarCodigo,  ok,codigo,
      messageError,
      messageOk,
      errorss} = useRestablecerAuth()

    const onSubmit = handleSubmit(data=>{
        enviarCodigo(data)
     //   Navigate('/Restablecer2')
   
      })

      const onSubmitCodigo = handleSubmit(data=>{
     codigoVerificar(data)
     //   Navigate('/Restablecer2')
   
      })

      const onSubmitPass = handleSubmit(data=>{
restablecerContrasena(data)
console.log(data)
         })

      useEffect(() => {
        if (errorss) {
          toast.warn(messageError, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }, [errorss]);
    
      useEffect(() => {
        if (ok) {
          toast(messageOk, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        //  almacenGet();
        }
      }, [ok]);
  return (
<>
    {!enviado && (
      <div className="loginBox">
    

      <h3 style={{color:"white"}}>Ingrese su correo</h3>
      
      <form onSubmit={onSubmit}>
     <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}> 
          {" "}
          <input
           
            type="email"
            
            placeholder="Email"
            {...register('email', { required: true })}
           
  
          />
   {errors.email && (
              <p>email is required</p>
            )}
         
          {" "}
      
       <button  style={{
        border: "none",
        display: "flex",
        outline: "none",
        height: "40px",
        fontSize: "16px",
        background: "#59238f",
        color: "#fff",
        borderRadius: "20px",
        cursor: "pointer"
      }}type="submit">Enviar codigo</button>
       </div>
      </form>
      <Link
          style={{ textDecoration: "none", color: "white"}}
          to="/"
        >
         Ir al Login
        </Link>
        
        <br />{" "}
     
  
    </div>
        
    )}
  {enviado && (
       <div className="loginBox">
    

       <h3 style={{color:"white"}}>Ingrese el codigo</h3>
       
       <form onSubmit={onSubmitCodigo}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}> 
           {" "}
           <input
            
             type="text"
             
             placeholder="Codigo"
             {...register('codigo', { required: true })}
            
   
           />
    {errors.codigo && (
               <p>Codigo is required</p>
             )}
          
           {" "}
       
        <button  style={{
         border: "none",
         display: "flex",
         outline: "none",
         height: "40px",
         fontSize: "16px",
         background: "#59238f",
         color: "#fff",
         borderRadius: "20px",
         cursor: "pointer"
       }}type="submit">Verificar codigo</button>
        </div>
       </form>
       <Link
           style={{ textDecoration: "none", color: "white"}}
           to="/"
         >
          Ir al Login
         </Link>
         
         <br />{" "}
      
   
     </div>
  )}

{codigo && (
       <div className="loginBox">
    

       <h3 style={{color:"white"}}>Ingrese la nueva contraseña</h3>
       
       <form onSubmit={onSubmitPass}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}> 
           {" "}
           <input
            
             type="password"
             
             placeholder="Introducir contraseña"
             {...register('pass1', { required: true })}
            
   
           />
    {errors.pass1 && (
               <p>Contraseña is required</p>
             )}
          
          <input
            
            type="password"
            
            placeholder="Introducir nuevamente la contraseña"
            {...register('pass2', { required: true })}
           
  
          />
   {errors.pass2 && (
              <p>Contraseña is required</p>
            )}
           {" "}
          
       
        <button  style={{
         border: "none",
         display: "flex",
         outline: "none",
         height: "40px",
         fontSize: "16px",
         background: "#59238f",
         color: "#fff",
         borderRadius: "20px",
         cursor: "pointer"
       }}type="submit">Cambiar contraseña</button>
        </div>
       </form>
       <Link
           style={{ textDecoration: "none", color: "white"}}
           to="/"
         >
          Ir al Login
         </Link>
         
         <br />{" "}
      
   
     </div>
  )}

{restablecido && (
       <div className="loginBox">
    

       <h3 style={{color:"white"}}>Contraseña Restablecida</h3>
       
    
       <Link
           style={{ textDecoration: "none", color: "white"}}
           to="/"
         >
          Ir al Login
         </Link>
         
         <br />{" "}
      
   
     </div>
  )}
      <ToastContainer/>

      </>
  )

}
