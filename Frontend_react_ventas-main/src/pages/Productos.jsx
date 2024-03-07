import React, {useEffect, useState} from 'react'
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TablePagination,
  TextField,
} from "@material-ui/core";
import Button from "react-bootstrap/Button";
import { Edit} from "@material-ui/icons";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import {useProductosAuth} from '../context/ProductosContext'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 function Productos() {

  const { get, productosList, Register,  errorss, messageError,
    messageOk,
    ok, Update, enabledProducto, disabledProducto} = useProductosAuth()
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const {
    register,
    handleSubmit,
    reset: resetForm,

    formState :{
      errors
  }
    // ... otros estados y funciones necesarios para el modal de edición
  } = useForm();

  useEffect(() => {
    get();
  }, []);

  const onSubmit = handleSubmit((data) => {

   console.log(data);
    Register(data);

  });

  const onSubmitEditar = handleSubmit((data) => {
    Update(data.id_producto, data)
  console.log(data);
   });

   
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
      get();
    }
  }, [ok]);

  const displayedProductos = productosList
  .filter((producto) => {
    // Verificar si algún valor de la fila coincide con el término de búsqueda
    const matchSearchTerm = Object.values(producto).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Verificar si el estado es true o false y coincide con el término de búsqueda
    const estado = producto.estado ? 'activo' : 'inactivo';
    const estadoMatchesSearch = estado.toLowerCase().includes(searchTerm.toLowerCase());

    // Retornar verdadero si alguna de las condiciones se cumple
    return matchSearchTerm || estadoMatchesSearch;
  })
  .slice(page * rowsPerPage, (page + 1) * rowsPerPage);


  const totalRowCount = productosList.length;
const handleChangePage = (event, newPage) => {
  setSearchTerm(""); // Resetear el filtro de búsqueda al cambiar de página
  setPage(newPage);

};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};



const abrirModalInsertar = () => {
  setModalInsertar(true);
};

const cerrarModalInsertar = () => {
  setModalInsertar(false);
  resetForm();
};


const abrirModalEditar = (user) => {
  setSelectedProducto(user);
  setModalEditar(true);
 
};

const cerrarModalEditar = () => {
  setSelectedProducto(null);
  setModalEditar(false);
  resetForm();
};

  return (

  
    <>
      <div className="App" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }} >
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-4 offset-4">
              <div className="d-grid mx-auto">
                <Button onClick={abrirModalInsertar}>Nuevo Producto</Button>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
              <div className="mb-3">
                <TextField
                  label="Buscar producto"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </div>
              <div className="table-responsive">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Codigo</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Activar / Inactivar</TableCell>
                        <TableCell>Editar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {displayedProductos.map((element) => (
                        <TableRow key={element.id_producto}>
                          <TableCell>{element.codigo}</TableCell>
                          <TableCell>{element.nombre}</TableCell>
                          <TableCell>{element.precio}</TableCell>
                          <TableCell> {element.estado ? 'Activo' : 'Inactivo'}</TableCell>
                          <TableCell>
                            <CheckIcon
                                   style={{ cursor: "pointer" }}
                                   onClick={() => enabledProducto(element.id_producto)}
                            />
                            &nbsp;
                            <ClearIcon
                                   style={{ cursor: "pointer" }}
                                   onClick={() => disabledProducto(element.id_producto)}
                            />
                          </TableCell>
                          <TableCell>
                            <Edit
                            onClick={() => abrirModalEditar(element)}
                              style={{ cursor: "pointer" }}
                            />
                            &nbsp;
                         
                          </TableCell>

                        </TableRow>
                      ))}

                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination 
                 rowsPerPageOptions={[5, 10, 25]}
                 component="div"
                 count={totalRowCount}
                 rowsPerPage={rowsPerPage}
                 page={page}
                 onPageChange={handleChangePage}
                 onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </div>

          <Modal show={modalInsertar} onHide={cerrarModalInsertar}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar nuevo producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={onSubmit} >
               
                <label htmlFor="nombres">Codigo:</label>
                <input
                  className="form-control"
                  id="codigo"
                  placeholder="Ingrese el codigo del producto"
                  {...register("codigo", { required: true })}
                  type="text"

                />
                 {
                    errors.codigo && (
                        <p>Codigo is required</p>
                    )
                }
                <label htmlFor="nombre">Nombre:</label>
                <input
                  className="form-control"
                  id="nombre"
                  placeholder="Ingrese el nombre del producto"
                  {...register("nombre", { required: true })}
                  type="text"
                />
                 {
                    errors.nombre && (
                        <p>nombre is required</p>
                    )
                }
                <label htmlFor="precio">Precio:</label>
                <input
                  className="form-control"
                  id="precio"
                  placeholder="Ingrese el precio"
                  {...register("precio", { required: true })}
                  type="text"
                />
                 {
                    errors.precio && (
                        <p>precio is required</p>
                    )
                }
                <br />
                <br />
                <Button  type="submit" variant="secondary">
                  Guardar
                </Button>
                &nbsp;
                <Button variant="primary" onClick={cerrarModalInsertar}>
                  Cancelar
                </Button>
              </form>
            </Modal.Body>
          </Modal>


          <Modal show={modalEditar} onHide={cerrarModalEditar}>
            <Modal.Header closeButton>
              <Modal.Title>Editar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedProducto && (
                <form onSubmit={onSubmitEditar} >
                  <input
                    type="hidden"
                    value={selectedProducto.id_producto}
                    {...register("id_producto", { required: true })}
                  />

                  <label htmlFor="codigo">Codigo:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="codigo"
                    defaultValue={selectedProducto.codigo}
                    {...register("codigo", { required: true })}
                  />

                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    defaultValue={selectedProducto.nombre}
                    {...register("nombre", { required: true })}
                  />
                  
                  <label htmlFor="precio">Precio LPS:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="precio"
                    defaultValue={selectedProducto.precio}
                    {...register("precio", { required: true })}
                  />

                 
                  <br />
                  <br />
                  <Button type="submit" variant="secondary">
                    Guardar
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={cerrarModalEditar}>
                    Cancelar
                  </Button>
                </form>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Productos
