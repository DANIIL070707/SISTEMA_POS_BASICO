import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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

import { useForm } from "react-hook-form";
import { useAlmacenAuth } from "../context/AlmacenContext";
import Button from "react-bootstrap/Button";
import InventoryIcon from "@mui/icons-material/Inventory";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Almacen() {
  const {
    almacenGet,
    almacenList,
    almacenNotGet,
    almacenNotList,
    Register,
    errorss,
    ok,
    messageError,
    messageOk,
    Update,
  } = useAlmacenAuth();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalSumar, setModalSumar] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const {
    register,
    handleSubmit,
    reset: resetForm,
    setValue,
    // ... otros estados y funciones necesarios para el modal de edición
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    /*
    const formData = {
      ...data,
      id_producto: data.id_producto,
    };
   
    */
    Register(data);
    console.log(data);
  });

  const onSubmitSumar = handleSubmit((data) => {
    Update(data);
    console.log(data);
  });

  const abrirModalSumar = (Producto) => {
    setSelectedProducto(Producto);
    setModalSumar(true);
  };

  const cerrarModalSumar = () => {
    setSelectedProducto(null);
    setModalSumar(false);
    resetForm();
  };
  const generaPDF = (List) => {
    const doc = new jsPDF();
    const columns = ["Codigo", "Nombre", "Cantidad"];
    const body = List.map((element) => [
      element.codigo,
      element.nombre,
      element.cantidad,
    ]);
    const imgWidth = 30; // Ancho deseado de la imagen en el PDF
    const imgHeight = 30; // Altura deseada de la imagen en el PDF
    const imgX = (doc.internal.pageSize.width - imgWidth) / 2; // Centrar horizontalmente
    const imgY = 20; // Posición vertical fija
    doc.addImage(
      "https://cdn-icons-png.flaticon.com/512/2271/2271068.png",
      "JPEG",
      imgX,
      imgY,
      imgWidth,
      imgHeight
    );
    doc.text("Reporte almacen", 85, 10);
    doc.autoTable({
      startY: 50,
      head: [columns],
      body: body,
    });

    doc.save("a4.pdf");
  };

  useEffect(() => {
    almacenGet();
  }, []);

  useEffect(() => {
    almacenNotGet();
  }, []);

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
      almacenGet();
    }
  }, [ok]);
  const abrirModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const displayedAlmacen = almacenList
    .filter((almacen) => {
      // Verificar si algún valor de la fila coincide con el término de búsqueda
      const matchSearchTerm = Object.values(almacen).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Verificar si el estado es true o false y coincide con el término de búsqueda

      // Retornar verdadero si alguna de las condiciones se cumple
      return matchSearchTerm;
    })
    .slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const totalRowCount = almacenList.length;
  const handleChangePage = (event, newPage) => {
    setSearchTerm(""); // Resetear el filtro de búsqueda al cambiar de página
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <div
        className="App"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}
      >
        <CardGroup>
          <Card>
            <Card.Img
              variant="top"
              src="https://cdn-icons-png.flaticon.com/512/1554/1554591.png"
              style={{ margin: "auto", maxWidth: "20%" }}
            />
            <Card.Body style={{ display: "flex", justifyContent: "center" }}>
              <Card.Title>Agregar producto al almacen</Card.Title>
              <br />
              <br />
            </Card.Body>
            <Card.Footer style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={abrirModalInsertar}>Agregar</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img
              variant="top"
              src="https://cdn-icons-png.flaticon.com/512/2400/2400072.png"
              style={{ margin: "auto", maxWidth: "20%" }}
            />
            <Card.Body style={{ display: "flex", justifyContent: "center" }}>
              <Card.Title style={{ display: "flex", justifyContent: "center" }}>
                Reporte
              </Card.Title>
            </Card.Body>
            <Card.Footer style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={() => generaPDF(almacenList)}>
                Generar PDF
              </Button>
            </Card.Footer>
          </Card>
        </CardGroup>

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
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Sumar mas cantidad al almacen</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedAlmacen.map((element) => (
                      <TableRow key={element.codigo}>
                        <TableCell>{element.codigo}</TableCell>
                        <TableCell>{element.nombre}</TableCell>
                        <TableCell>{element.cantidad}</TableCell>
                        <TableCell>
                          <InventoryIcon
                            onClick={() => abrirModalSumar(element)}
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

          <Modal show={modalInsertar} onHide={cerrarModalInsertar}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar nuevo producto al almacen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={onSubmit}>
                <label htmlFor="id_producto">
                  Producto que aun no esta en el almacen:
                </label>
                <Select
                  id="id_producto"
                  name="id_producto"
                  options={almacenNotList.map((Not) => ({
                    value: Not.id_producto,
                    label: Not.codigo + " " + Not.nombre,
                  }))}
                  onChange={(selectedOption) =>
                    setValue("id_producto", selectedOption.value)
                  }
                />
                <label htmlFor="cantidad">Cantidad inicial</label>
                <input
                  type="text"
                  className="form-control"
                  id="cantidad"
                  {...register("cantidad", { required: false })}
                />
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

          <Modal show={modalSumar} onHide={cerrarModalSumar}>
            <Modal.Header closeButton>
              <Modal.Title>Sumar unidades al producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedProducto && (
                <form onSubmit={onSubmitSumar}>
                  <input
                    type="hidden"
                    value={selectedProducto.codigo}
                    {...register("codigo", { required: true })}
                  />
                  <label htmlFor="cantidad">Cantidad a sumar:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cantidad"
                    {...register("cantidad", { required: false })}
                  />
                  <br />
                  <br />
                  <Button type="submit" variant="secondary">
                    Guardar
                  </Button>
                  &nbsp;
                  <Button variant="primary" onClick={cerrarModalSumar}>
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
