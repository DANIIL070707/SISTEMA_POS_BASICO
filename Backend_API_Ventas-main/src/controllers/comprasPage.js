import { getConnection } from "../database/connection.js";

export const productosParaCompras = async (req, res) => {
  try {
    const pool = await getConnection();
    const request = pool.request();
    const result = await request.execute("SP_PRODUCTOS_PARA_COMPRAS");

    if (result.rowsAffected > 0) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(403).json({ message: "Productos no encontrados" });
    }
  } catch (error) {}

  return res.status(404).json(error);
};

export const compraConfirmada = async (req, res) => {
  const { productos, montos , factura} = req.body;
  const productosSinUnidadesSuficientes = [];
  //console.log(Object.keys(o).length)
  console.log(productos);
  const min = 1;
  const max = 999999999999999;

 
  
  const subtotal = montos[0].subtotal;
  const ISV = montos[0].ISV;
  const total = montos[0].total;
  try {
    const pool = await getConnection();

    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      const id_producto = producto.id_producto;
      const cantidad = producto.cantidad;

      console.log(id_producto);
      console.log(cantidad);
      const request = pool.request();
      request.input("id_producto", id_producto);
      request.input("cantidad", cantidad);
      const result = await request.execute("SP_COMPARAR_CANTIDADES");

      if (cantidad > result.recordset[0].cantidad) {
        //  return res.status(200).json({ message: "No hay unidades suficientes" });
        productosSinUnidadesSuficientes.push(id_producto);
      }
    }

    if (productosSinUnidadesSuficientes.length > 0)
      return res
        .status(404)
        .json({
          message: "No hay unidades suficientes",
          Los_productos_con_el_id: productosSinUnidadesSuficientes,
        });

    //  return res.status(201).json({ message: "success" })

    const request2 = pool.request()
    request2.input("factura", factura)
    request2.input("subtotal", subtotal)
    request2.input("ISV", ISV)
    request2.input("total", total)

    const result2 = await  request2.execute("SP_COMPRA_CONFIRMADA")

    if(result2.rowsAffected > 0){
      for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        const id_producto = producto.id_producto;
        const cantidad = producto.cantidad;
        const request3 = pool.request();
        request3.input("id_producto", id_producto);
        request3.input("cantidad", cantidad);
        request3.input("factura", factura);
  
        const result3 = await request3.execute("SP_PRODUCTOS_VENTA");
  
        if (i == productos.length - 1) {
          if (result3.rowsAffected[0] > 0) {
            return res.status(201).json({ message: "Compra exitosa" });
          } else {
            return res.status(404).json({ message: "Error al realizar compra" });
          }
        }
      }
    }else{
      return res.status(404).json({ message: "Error al realizar compra" });
    }
    
  } catch (error) {
    return res.status(404).json(error);
  }
};


export const getCompras = async (req, res) =>{
  try {
    const pool = await getConnection();
    const request = pool.request();
    const result = await request.execute("SP_TRAER_COMPRAS");

    if (result.rowsAffected > 0) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(403).json({ message: "Compras no encontradas" });
    }
  } catch (error) {
    return res.status(404).json(error);
  }

  
}