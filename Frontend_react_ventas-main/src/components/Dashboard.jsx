import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer"
import Productos from "../pages/Productos";
import Personas from "../pages/Personas";
import Almacen from "../pages/Almacen";
import Homes from "../pages/Homes";
import Users from "../pages/Users";
import Compras from '../pages/Compras'
import RealizarCompra from "../pages/RealizarCompra";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import '@fortawesome/fontawesome-free/css/all.css';
import { useAuth } from "../context/AuthContext";

import TModal from "./TModal";

function Dashboard() {

const [show, setShow] = useState(false)
const [counter, setCounter] = useState(20)
const [contadorAutomatico, setContadorAutomatico] = useState(false)
const [inactive, setInactive] = useState(false)
const {Salir} = useAuth()


const handleClose = () => {


  setShow(false)
  Salir()
  
}
const handleShow = () => setShow(true)

 const Reiniciar= () => {
  setCounter(20);
 setContadorAutomatico(false); 
 return setShow(false)
};


let inactivityTimer;
const resetTimer = () => {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    setInactive(true);
  }, 600000); // Cambia el tiempo en milisegundos según tus necesidades 600000
};

const handleMouseMove = () => {
  setInactive(false);
  resetTimer();
};

useEffect(()=>{
  resetTimer();

    window.addEventListener('mousemove', handleMouseMove);
},[])

useEffect(()=>{
 

if(inactive){
   handleShow()
   setContadorAutomatico(true);
}
  
},[inactive])

useEffect(() => {
  const interval = setInterval(() => {
    if (counter > 0) {
      if(contadorAutomatico){
        setCounter(prevNumero => prevNumero - 1);
      }
      }else if(counter == 0){
            Salir()
      }
  
  }, 1000);

  return () => clearInterval(interval);
}, [counter,contadorAutomatico]);



  return (


    <div>

        <Navbar />
        <Sidebar />
        <div className="content-wrapper">
          {/* Definición de las rutas secundarias del Dashboard */}
          <Routes>
            {/* Ruta por defecto */}
            <Route index element={<Homes />} />

            {/* Otras rutas */}
            <Route path="users" element={<Users />} />
            <Route path="productos" element={<Productos />} />
            <Route path="personas" element={<Personas />} />
            <Route path="almacen" element={<Almacen />} />
            <Route path="compras/*" element={<Compras />} />
            <Route path="compras/realizarCompra" element={<RealizarCompra />} />
          </Routes>

          {/* Modal */}
          <TModal show={show} handleClose={handleClose} counter={counter} Reiniciar={Reiniciar}/>
        </div>
        <Footer />
     
    </div>
  
  );
}

export default Dashboard;
