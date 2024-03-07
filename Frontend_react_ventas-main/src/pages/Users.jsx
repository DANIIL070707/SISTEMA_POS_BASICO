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
import Select from "react-select";
import { Edit, Delete } from "@material-ui/icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUserAuth } from "../context/UsersContext";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
  const {
    get,
    userList,
    getRolesSelect,
    rolesList,
    errorss,
    messageError,
    Register,
    messageOk,
    ok,
    estadosList,
    getEstadosSelect,
    Update,
    EliminarUsuario,
    getPersonasSelect,
    personasList,
  } = useUserAuth();
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    reset: resetForm,
    setValue
    // ... otros estados y funciones necesarios para el modal de edición
  } = useForm();

  const onSubmit = handleSubmit((data) => {

    const formData = {
      ...data,
      id_persona: data.id_persona,
    };
    Register(formData);
    console.log(formData);
  });

  const onSubmitEditar = handleSubmit((data) => {
    if(data.pass == ""){
       const formData = {
        ...data,
        pass: null,
       }
       Update(formData.id_user, formData);
    }
    Update(data.id_user, data);
  });

  const userDelete = (id) => {
    EliminarUsuario(id);
  };

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

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    getRolesSelect();
  }, []);

  useEffect(() => {
    getPersonasSelect();
  }, []);

  useEffect(() => {
    getEstadosSelect();
  }, []);

  const abrirModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
    resetForm();
  };

  const abrirModalEditar = (user) => {
    setSelectedUser(user);
    setModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setSelectedUser(null);
    setModalEditar(false);
    resetForm();
  };

  const handleChangePage = (event, newPage) => {
    setSearchTerm(""); // Resetear el filtro de búsqueda al cambiar de página
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calcula el recuento total de filas después de aplicar cualquier filtro o paginación
  const totalRowCount = userList.length;

  // Filtra las filas correspondientes a la página actual y al número de filas por página
  const displayedUsers = userList
    .filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleRoleChange = (event) => {
    const newRoleId = event.target.value;
    alert(newRoleId);
    setSelectedUser((prevUser) => ({
      ...prevUser,
      id_rol: newRoleId,
    }));
  };

  const handleStatuChange = (event) => {
    const newStatuId = event.target.value;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      id_state: newStatuId,
    }));
  };

  return (
    <>
      <div className="App" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-4 offset-4">
              <div className="d-grid mx-auto">
                <Button onClick={abrirModalInsertar}>Nuevo usuario</Button>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-0 offset-lg-2">
              <div className="mb-3">
                <TextField
                  label="Buscar usuario"
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
                        <TableCell>Usuario</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Persona</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {displayedUsers.map((element) => (
                        <TableRow key={element.id_user}>
                          <TableCell>{element.users_name}</TableCell>
                          <TableCell>{element.email}</TableCell>
                          <TableCell>{element.rol_name}</TableCell>
                          <TableCell>{element.state_name}</TableCell>
                          <TableCell>{element.Persona}</TableCell>
                          <TableCell>
                            <Edit
                              onClick={() => abrirModalEditar(element)}
                              style={{ cursor: "pointer" }}
                            />
                            &nbsp;
                            <Delete
                              onClick={() => userDelete(element.id_user)}
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
              <Modal.Title>Agregar nuevo usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={onSubmit}>
                <label htmlFor="username">Persona:</label>
              <Select
  id="id_persona"
  name="id_persona"
  options={personasList.map((persona) => ({
    value: persona.id_persona,
    label: persona.nombre,
  }))}
  onChange={(selectedOption) => setValue("id_persona", selectedOption.value)}
/>
                <label htmlFor="username">Nombre de Usuario:</label>
                <input
                  className="form-control"
                  id="username"
                  placeholder="Ingrese su nombre de usuario"
                  {...register("users_name", { required: true })}
                  type="text"
                />
                <label htmlFor="email">Correo:</label>
                <input
                  className="form-control"
                  id="email"
                  placeholder="Ingrese su correo electrónico"
                  {...register("email", { required: true })}
                  type="email"
                />
                <label htmlFor="password">Contraseña:</label>
                <input
                  className="form-control"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  {...register("pass", { required: true })}
                  type="password"
                />
                <label htmlFor="role">Rol:</label>
                <select
                  className="form-control"
                  id="role"
                  {...register("id_rol", { required: true })}
                >
                  {rolesList.map((element) => (
                    <option value={element.id_rol}>{element.rol_name}</option>
                  ))}
                </select>
                <br />
                <br />
                <Button type="submit" variant="secondary">
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
              <Modal.Title>Editar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedUser && (
                <form onSubmit={onSubmitEditar}>
                  <input
                    type="hidden"
                    value={selectedUser.id_user}
                    {...register("id_user", { required: true })}
                  />
                  <label htmlFor="username">Nombre de Usuario:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    defaultValue={selectedUser.users_name}
                    {...register("users_name", { required: true })}
                  />
                  <label htmlFor="email">Correo:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    defaultValue={selectedUser.email}
                    {...register("email", { required: true })}
                  />
                  <label htmlFor="email">Contraseña /opcional/:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("pass", { required: false })}
                  />
                  <label htmlFor="rol">Estado:</label>
                  <select
                    className="form-control"
                    id="stateEditar"
                    defaultValue={selectedUser.id_state}
                    onChange={handleStatuChange}
                    {...register("id_state", { required: true })}
                  >
                    {estadosList.map((element) => (
                      <option value={element.id_state}>
                        {element.state_name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="role">Rol:</label>
                  <select
                    className="form-control"
                    id="roleEditar"
                    defaultValue={selectedUser.id_rol}
                    onChange={handleRoleChange}
                    {...register("id_rol", { required: false })}
                  >
                    {rolesList.map((element) => (
                      <option value={element.id_rol}>{element.rol_name}</option>
                    ))}
                  </select>
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

export default Users;
