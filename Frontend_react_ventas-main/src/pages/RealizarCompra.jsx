import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from "react-select";
import {Delete} from "@material-ui/icons";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, TextField ,   TablePagination} from "@material-ui/core";
import { useComprasAuth } from '../context/ComprasContext';
import { toast, ToastContainer } from "react-toastify";
//import Select from "react-select";
const steps = ['Opciones de compra', 'Resumen de la compra'];

export default function RealizarCompra() {
  const {getProductosVentas, productosVenta,  compra,
    ok,
   messageError,
   messageOk,
   errorss} = useComprasAuth()
  const [activeStep, setActiveStep] = useState(0);
  const [id_producto, setIdProducto] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [detallesCompra, setDetallesCompra] = useState([]);
  const [formData, setFormData] = useState({factura: 0 ,productos: [], montos: [{ subtotal: 0, ISV: 0, total: 0 }]});
const [precio, setPrecio] = useState(0)


  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

 
   
  useEffect(() => {
    getProductosVentas()
  

    
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
    //  almacenGet();
    }
  }, [ok]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
compra(formData)
  };

  const handleBack = () => { 
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setFormData({factura: 0 ,productos: [], montos: [{ subtotal: 0, ISV: 0, total: 0 }]})
    setDetallesCompra([])
  };

  const ProcesoFinalizado = () => {
    setActiveStep(0)
    setFormData({factura: 0 ,productos: [], montos: [{ subtotal: 0, ISV: 0, total: 0 }]})
    setDetallesCompra([])
  }
 
  const agregarCompra = () => {
    const detalle = { id_producto, cantidad };
   const numeroAleatorio = Math.floor(Math.random() * 10000000000);

    const subtotalDetalle = precio * cantidad;
    const isvDetalle = subtotalDetalle * 0.15;
    const totalDetalle = subtotalDetalle + isvDetalle;
  
    // Actualizar los montos en el primer objeto de montos
    const primerMonto = formData.montos[0];
    const nuevoPrimerMonto = {
      ...primerMonto,
      subtotal: primerMonto.subtotal + subtotalDetalle,
      ISV: primerMonto.ISV + isvDetalle,
      total: primerMonto.total + totalDetalle,
    };
  
    const nuevosMontos = [nuevoPrimerMonto, ...formData.montos.slice(1)];
  
    setDetallesCompra([...detallesCompra, detalle]);
    const nuevosProductos = [...formData.productos, detalle];
    setFormData({ ...formData, productos: nuevosProductos, montos: nuevosMontos, factura: numeroAleatorio });
    //setFormData({ ...formData, factura: numeroAleatorio})
    setIdProducto("");
    setCantidad(0);
  };
  

  const eliminarDetalle = (nombre, cantidad) => {
    let nuevosMontos = [...formData.montos];
    productosVenta.forEach(element => {
      if (element.id_producto === nombre) {
        const resta = element.precio * cantidad;
  
        const primerMonto = formData.montos[0];
        const subtotalPrimero = formData.montos[0].subtotal;
        const subtotal = subtotalPrimero - resta;
        const ISV = subtotal * 0.15;
        const total = subtotal + ISV;

        console.log(primerMonto);
        console.log(subtotalPrimero);
    
        const nuevoPrimerMonto = {
          ...primerMonto,
          subtotal: parseFloat(subtotal.toFixed(2)),
          ISV: ISV,
          total: total,
        };

        console.log(nuevoPrimerMonto)
        nuevosMontos = [nuevoPrimerMonto, ...formData.montos.slice(1)];
      
      }
    });
    const Eliminado = detallesCompra.filter(detallesCompra => detallesCompra.id_producto !== nombre)
    const Eliminado2 = formData.productos.filter(producto => producto.id_producto !== nombre);
    setFormData({
      ...formData,
      productos: Eliminado2,
      montos: nuevosMontos
    });
    setDetallesCompra(Eliminado)

  };
  

console.log(detallesCompra)
console.log(formData)

  const displayedCompras = detallesCompra
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

const totalRowCount = detallesCompra.length;
const handleChangePage = (event, newPage) => {
  setSearchTerm(""); // Resetear el filtro de búsqueda al cambiar de página
  setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const productoSeleccionado =(selectedOption)=>{
  const selectedPrecio = productosVenta.find(
    (producto) => producto.id_producto === selectedOption.value
  ).precio;
  setPrecio(selectedPrecio);
  setIdProducto(selectedOption.value);
}

  return (
    <>
    <div
    className="App"
    style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}
  >
    <Box sx={{ width: '90%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Proceso Finalizado
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
           
            <Button onClick={() => ProcesoFinalizado()}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 0 && (
            <Box>
         <Select
  id="id_producto"
  name="id_producto"
  options={productosVenta.map((producto) => ({
    value: producto.id_producto,
    label: producto.nombre,
  }))}
  onChange={productoSeleccionado}
/>
<br />
              <br />     
              <TextField
                label="Cantidad"
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
              <br />
              <br />
         <Button onClick={agregarCompra} style={{ backgroundColor: 'blue', color: 'white' }}>
  Agregar a la compra
</Button>

            </Box>
          )}
          {activeStep === 0 && (
            <Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id Producto</TableCell>
                      <TableCell>Cantidad</TableCell>
                      
                      <TableCell>Eliminar</TableCell>
                    
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedCompras.map((detalle, index) => (
                      <TableRow key={index}>
                        <TableCell>{detalle.id_producto}</TableCell>
                        <TableCell>{detalle.cantidad}</TableCell>
                        <TableCell>
                          <Delete
                          
                          onClick={() => eliminarDetalle(detalle.id_producto, detalle.cantidad)}
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

<h3>Subtotal: {formData.montos[0].subtotal}</h3>
<h3>ISV: {formData.montos[0].ISV}</h3>
<h3>Total: {formData.montos[0].total}</h3>
            </Box>

       
          )}

{activeStep === 1  && (
  <Box>
   <h2>Compra exitosa</h2>
   <br />
   <h2>Resumen de la compra</h2>
   <br />
<h3>Factura: {formData.factura}</h3>
<br />
   {formData.productos.map((detalle, index) => (
                    <React.Fragment key={index}>
                  <h3>ID del producto {detalle.id_producto} Cantidad comprada {detalle.cantidad}</h3>
                  </React.Fragment>
                    ))}
<br/>
<h3>Sub total: {formData.montos[0].subtotal} ISV: {formData.montos[0].ISV} Total: {formData.montos[0].total}</h3>    
  </Box>


)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              <br />
              {activeStep === steps.length - 1 ? 'Finish' : 'Confirmar compra'}
            </Button>
          </Box>



          
        </React.Fragment>
      )}
    </Box>
    
    </div>
    
    <ToastContainer />
    </>
  );
}
