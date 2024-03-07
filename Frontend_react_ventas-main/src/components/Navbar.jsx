import React from 'react'
import { useAuth } from '../context/AuthContext'
function Navbar() {

  const {Salir} = useAuth()
  return (
   <nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="index3.html" className="nav-link">Home</a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="#" className="nav-link">Contact</a>
    </li>
  </ul>
  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto">
    {/* Navbar Search */}
    <li className="nav-item">
    <button onClick={()=>Salir()} type="button" class="btn btn-danger">Salir</button>
    </li>
   
  </ul>
</nav>

  )
}

export default Navbar