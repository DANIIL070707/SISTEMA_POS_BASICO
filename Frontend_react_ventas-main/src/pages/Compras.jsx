
import React, {useState, useEffect} from "react";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
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
import { useComprasAuth} from "../context/ComprasContext";
export default function Compras() {
  const {comprasGet, comprasList} = useComprasAuth()
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
  comprasGet()
  }, []);


  const displayedCompras = comprasList
  .filter((almacen) => {
    // Verificar si algún valor de la fila coincide con el término de búsqueda
    const matchSearchTerm = Object.values(almacen).some((value) =>
      value !== null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Retornar verdadero si alguna de las condiciones se cumple
    return matchSearchTerm;
  })
  .slice(page * rowsPerPage, (page + 1) * rowsPerPage);

const totalRowCount = comprasList.length;
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
              src="https://cdn-icons-png.flaticon.com/512/513/513898.png"
              style={{ margin: "auto", maxWidth: "20%" }}
            />
            <Card.Body style={{ display: "flex", justifyContent: "center" }}>
              <Card.Title>Realizar compra</Card.Title>
              <br />
              <br />
            </Card.Body>
            <Card.Footer style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{
                  backgroundColor: "#007bff", // Color azul
                  color: "white", // Color del texto
                  border: "none", // Sin borde
                  padding: "8px 16px", // Espaciado interno
                  borderRadius: "4px", // Bordes redondeados
                  cursor: "pointer", // Cursor al pasar por encima
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/dashboard/compras/realizarCompra"
                >
                  Agregar compra
                </Link>
              </Button>
            </Card.Footer>
          </Card>
        </CardGroup>

        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="mb-3">
              <TextField
                label="Buscar compra"
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
                      <TableCell>Factura</TableCell>
                      <TableCell>Subtotal</TableCell>
                      <TableCell>ISV</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Fecha</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedCompras.map((element) => (
                      <TableRow key={element.factura}>
                        <TableCell>{element.factura}</TableCell>
                        <TableCell>{element.sub_total}</TableCell>
                        <TableCell>{element.ISV}</TableCell>
                        <TableCell>{element.total}</TableCell>
                        <TableCell>{element.fecha}</TableCell>
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
      </div>
    </>
  );
}
