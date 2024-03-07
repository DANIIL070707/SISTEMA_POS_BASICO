import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function ProtectedRoute(){

   const {isAuthenticate, loading} = useAuth()


   if(!loading && !isAuthenticate) return < Navigate to='/' replace/>
return(
   <Outlet/> //Quiere decir continuar con el componente que esta adentro
)

}



export default ProtectedRoute