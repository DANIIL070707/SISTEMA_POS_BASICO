import React from "react";

//import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx"
import Restablecer from "./components/Restablecer.jsx";
import Restablecer2 from "./components/Restablecer2.jsx";
import ProtectedRoute from "./ProtecteRoute.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { UsersProvider } from "./context/UsersContext.jsx";
import { PersonasProvider } from "./context/PersonasContext.jsx";
import { ProductosProvider } from "./context/ProductosContext.jsx";
import { AlmacenProvider } from "./context/AlmacenContext.jsx";
import { ComprasProvider } from "./context/ComprasContext.jsx";
import { RestablecerProvider } from "./context/RestablecerContext.jsx";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
   


      <AuthProvider>
        <RestablecerProvider>
        <UsersProvider>
          <PersonasProvider>
            <ProductosProvider>
              <AlmacenProvider>
                <ComprasProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
           <Route path="/Restablecer" element={<Restablecer />} />
           <Route path="/Restablecer2" element={<Restablecer2 />} />
            <Route element={<ProtectedRoute />}>
             
              <Route path="dashboard/*" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
        </ComprasProvider>
        </AlmacenProvider>
        </ProductosProvider>
        </PersonasProvider>
        </UsersProvider>
        </RestablecerProvider>
      </AuthProvider>
     
  
   
  );
}
export default App
