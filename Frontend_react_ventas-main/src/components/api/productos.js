import axios from './axios.js'

export const getPrdouctos = () => axios.get('/getProductos')
export const registerProducto = (producto) => axios.post('/createProducto', producto)
export const updateProducto = (id_producto, producto) => axios.put(`/updateProducto/${id_producto}`, producto)
export const desactivarProducto = (id_producto) => axios.put(`/desactivarProducto/${id_producto}`)
export const activarProducto = (id_producto) => axios.put(`/activarProducto/${id_producto}`)
