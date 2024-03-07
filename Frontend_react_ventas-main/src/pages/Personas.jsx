import React, { useEffect, useState } from "react";
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
import { Edit, Delete} from "@material-ui/icons";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { usePersonaAuth } from '../context/PersonasContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Personas() {
  
  const { get, ppersonasList, Register,  errorss, messageError,
    messageOk,
    ok, Update, EliminarPersona} = usePersonaAuth();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
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

   
    Register(data);

  });

  const onSubmitEditar = handleSubmit((data) => {
   Update(data.id_persona, data)
 
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

  const displayedPersonas = ppersonasList
  .filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )
  .slice(page * rowsPerPage, (page + 1) * rowsPerPage);

// Calcula el recuento total de filas después de aplicar cualquier filtro o paginación
const totalRowCount = ppersonasList.length;
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
  setSelectedPersona(user);
  setModalEditar(true);
};

const cerrarModalEditar = () => {
  setSelectedPersona(null);
  setModalEditar(false);
  resetForm();
};

  return (
    <>
      <div className="App" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-4 offset-4">
              <div className="d-grid mx-auto">
                <Button onClick={abrirModalInsertar}>Nueva persona</Button>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
              <div className="mb-3">
                <TextField
                  label="Buscar persona"
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
                        <TableCell>Nombres</TableCell>
                        <TableCell>Apellidos</TableCell>
                        <TableCell>Telefono</TableCell>

                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {displayedPersonas.map((element) => (
                        <TableRow key={element.id_persona}>
                          <TableCell>{element.nombres}</TableCell>
                          <TableCell>{element.apellidos}</TableCell>
                          <TableCell>{element.telefono}</TableCell>
                         
                          <TableCell>
                            <Edit
                            onClick={() => abrirModalEditar(element)}
                              style={{ cursor: "pointer" }}
                            />
                            &nbsp;
                            <Delete
                            onClick={() => EliminarPersona(element.id_persona)}
                            style={{ cursor: "pointer" }}
                          />
                           
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
              <Modal.Title>Agregar nueva persona</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={onSubmit} >
               
                <label htmlFor="nombres">Nombres:</label>
                <input
                  className="form-control"
                  id="nombres"
                  placeholder="Ingrese los nombres de la persona"
                  {...register("nombres", { required: true })}
                  type="text"

                />
                 {
                    errors.nombres && (
                        <p>Nombres is required</p>
                    )
                }
                <label htmlFor="apellidos">Apellidos:</label>
                <input
                  className="form-control"
                  id="apellidos"
                  placeholder="Ingrese los apellidos de la persona"
                  {...register("apellidos", { required: true })}
                  type="text"
                />
                 {
                    errors.apellidos && (
                        <p>Apellidos is required</p>
                    )
                }
                <label htmlFor="telefono">Telefono:</label>
                <input
                  className="form-control"
                  id="Telefono"
                  placeholder="Ingrese el telefono"
                  {...register("telefono", { required: true })}
                  type="tel"
                />
                 {
                    errors.telefono && (
                        <p>telefono is required</p>
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
              <Modal.Title>Editar persona</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedPersona && (
                <form onSubmit={onSubmitEditar} >
                  <input
                    type="hidden"
                    value={selectedPersona.id_persona}
                    {...register("id_persona", { required: true })}
                  />
                  <label htmlFor="nombres">Nombres:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombres"
                    defaultValue={selectedPersona.nombres}
                    {...register("nombres", { required: true })}
                  />
                  <label htmlFor="apellidos">Apellidos:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellidos"
                    defaultValue={selectedPersona.apellidos}
                    {...register("apellidos", { required: true })}
                  />
                  
                  <label htmlFor="telefono">Telefono:</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    defaultValue={selectedPersona.telefono}
                    {...register("telefono", { required: true })}
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
  );
}

export default Personas