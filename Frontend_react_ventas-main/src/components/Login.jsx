import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/loginn.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useForm} from 'react-hook-form'
import { useAuth} from "../context/AuthContext";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




export default function Login() {
 const {register, handleSubmit, formState:{errors}} = useForm()
 const {Acceso, isAuthenticate, errorss, messageError} = useAuth()
const navigate = useNavigate()


const onSubmit = handleSubmit(data=>{
  Acceso(data)

})

useEffect(()=>{
  if(isAuthenticate) navigate('/dashboard')
},[isAuthenticate])

useEffect(()=>{
  if(errorss){
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
},[errorss])



  return (


    <><div className="loginBox">

      <img
        className="user"
        src="https://i.ibb.co/yVGxFPR/2.png"
        height="100px"
        width="100px" />
      <h3>Sistema de ventas</h3>
      <form onSubmit={onSubmit}>
        <div className="inputBox">
          {" "}
          <input
            {...register('email', { required: true })}
            type="email"

            placeholder="Email" />
          {errors.email && (
            <p>email is required</p>
          )}
          <input
            {...register('pass', { required: true })}
            type="password"

            placeholder="Password" />
          {errors.password && (
            <p>password is required</p>
          )}
          {" "}
        </div>{" "}
        <input type="submit" name defaultValue="Login" />
      </form>
      <Link
        style={{ textDecoration: "none", color: "white"}}
        to="/Restablecer"
      >
        Restablecer contraseña
      </Link>
      <br />{" "}
   
      <ToastContainer />

    </div>
    </>

  );


}
