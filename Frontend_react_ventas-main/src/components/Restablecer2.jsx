import React, {useEffect, useState} from 'react'
import { useRestablecerAuth } from '../context/RestablecerContext'
import {toast, ToastContainer} from 'react-toastify'
function Restablecer2() {
  const {enviarCodigo,  ok,
    messageError,
    messageOk,
    errorss} = useRestablecerAuth()


  
  return (

    <>
   
    <div>Restablecer2</div>
    <ToastContainer/>
    </>
  )
}

export default Restablecer2