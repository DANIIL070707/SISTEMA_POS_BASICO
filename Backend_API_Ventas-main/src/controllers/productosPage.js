import { getConnection } from "../database/connection.js";


export const getProductos = async (req, res) => {
    try {
        const pool = await getConnection()
        const request = pool.request()
        const result = await request.execute("SP_TRAER_PRODUCTOS")
        if (result.rowsAffected > 0) {
          return res.status(200).json(result.recordset);
        } else {
            return res.status(404).json({ message: "Productos no encontradas" });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}
export const createProducto = async (req, res) => {
    const {codigo, nombre, precio} = req.body
    try {
        const pool = await getConnection()
        const request = pool.request()

        request.input("codigo", codigo)
        request.input("nombre", nombre)
        request.input("precio", precio)
    

        const result = await request.execute("SP_CREAR_PRODUCTO")
        if (result.rowsAffected > 0) {
          return res.status(201).json({ message: "Producto registrado" });
        } else {
            return res.status(404).json({ message: "El producto no pudo ser registrado" });
        }
    } catch (error) {
        return res.status(404).json(error);
    }
}

export const updateProduto = async (req,res) =>{
    const { codigo,nombre, precio} = req.body;
    const id_producto = req.params.id_producto;
    try {

        const pool = await getConnection();
        const request = pool.request();

        request.input("id_producto", id_producto);
        request.input("codigo", codigo);
        request.input("nombre",nombre);
        request.input("precio", precio);
    
        const result = await request.execute("SP_ACTUALIZAR_PRODUCTO");
    
        if (result.rowsAffected > 0) {
          return res.status(200).json({ message: "Producto actualizado" });
        } else {
          return res
            .status(404)
            .json({ message: "El producto no pudo ser actualizado" });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}


export const activarProduto = async (req,res) =>{
    const id_producto = req.params.id_producto;
    try {
        const pool = await getConnection();
        const request = pool.request();

        request.input("id_producto", id_producto);
        const result = await request.execute("SP_ACTIVAR_PRODUCTO");
        
        if (result.rowsAffected > 0) {
            return res.status(200).json({ message: "Producto activado" });
          } else {
            return res
              .status(404)
              .json({ message: "El producto no pudo ser activado" });
          }
    } catch (error) {
        return res.status(500).json(error);
    }
    }

export const desactivarProduto = async (req,res) =>{
    const id_producto = req.params.id_producto;
try {
    const pool = await getConnection();
    const request = pool.request();

    request.input("id_producto", id_producto);
    const result = await request.execute("SP_DESACTIVAR_PRODUCTO");
    if (result.rowsAffected > 0) {
        return res.status(200).json({ message: "Producto desactivado" });
      } else {
        return res
          .status(404)
          .json({ message: "El producto no pudo ser desactivado" });
      }
} catch (error) {
    return res.status(500).json(error);
}
}