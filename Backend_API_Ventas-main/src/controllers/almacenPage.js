import { getConnection } from "../database/connection.js";

export const ingresarProductoAlmacen = async (req,res)=>{
const {id_producto, cantidad} = req.body
    try {

        const pool = await getConnection();
        const request = pool.request();
    
        request.input("id_producto", id_producto);

    
        const result = await request.execute("SP_VERIFICAR_PRODUCTO_ALMACEN");
    
        if (result.rowsAffected > 0) {
          return res
            .status(500)
            .json({ message: "Ya existe este producto en el almacen" });
        } else {
          const request2 = pool.request();
          
          request2.input("id_producto", id_producto);
          request2.input("cantidad", cantidad);
          const result2 = await request2.execute("SP_INGRESAR_PRODUCTO_ALMACEN");
    
          if (result2.rowsAffected > 0) {
            return res.status(201).json({ message: "Producto ingresado al almacen" });
          } else {
            return res.status(500).json({ message: "El producto no pudo ser ingresado al almacen" });
          }
        }
    
} catch (error) {
    return res.status(500).json(error);
}

}

export const updateExistencia = async (req,res)=>{
    const { codigo, cantidad} = req.body;

    try {

        const pool = await getConnection();
        const request = pool.request();

      
        request.input("codigo", codigo);
        request.input("cantidad", cantidad);
    
        const result = await request.execute("SP_ACTUALIZAR_CANTIDAD_ALMACEN");
    
        if (result.rowsAffected > 0) {
          return res.status(200).json({ message: "Cantidad actualizada" });
        } else {
          return res
            .status(404)
            .json({ message: "La cantidad no pudo ser actualizada" });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getProductosNoAlmacen = async (req,res) =>{
 try {
  const pool = await getConnection()
  const request = pool.request()
  const result = await  request.execute("SP_PRODUCTOS_NO_ALMACEN")

  if (result.rowsAffected > 0) {
    return res.status(200).json(result.recordset);
  } else {
      return res.status(404).json({ message: "Productos no encontradas" });
  }
 } catch (error) {
  return res.status(500).json(error);
 }
}

export const getAlmacen = async (req,res) =>{
  try {
   const pool = await getConnection()
   const request = pool.request()
   const result = await  request.execute("SP_TRAER_ALMACEN")
 
   if (result.rowsAffected > 0) {
     return res.status(200).json(result.recordset);
   } else {
       return res.status(404).json({ message: "Almacen no encontrado" });
   }
  } catch (error) {
   return res.status(500).json(error);
  }
 }