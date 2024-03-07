import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { users, roleAdmin, roleVendedor} = useAuth();


console.log(roleAdmin)
console.log(roleVendedor)


  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Ventas</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              {users.users_name}
            </a>
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

            { (roleAdmin || users.id_rol == 1) && (
              <li className="nav-item menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    MANTENIMIENTO
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/dashboard/users"
                      >
                        USUARIOS
                      </Link>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/dashboard/personas"
                      >
                        PERSONAS
                      </Link>
                    </a>
                  </li>
                </ul>
              </li>
            )}


{ (roleVendedor || roleAdmin || users.id_rol == 3 || users.id_rol == 1) &&  (
            <li className="nav-item menu-open">
              <a href="#" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  VENTAS / VENDEDOR
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/dashboard/productos"
                    >
                      PRODUCTOS
                    </Link>
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/dashboard/almacen"
                    >
                      ALMACEN
                    </Link>
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/dashboard/compras"
                    >
                      COMPRAS
                    </Link>
                  </a>
                </li>
              </ul>
            </li>
)}
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}

export default Sidebar;
