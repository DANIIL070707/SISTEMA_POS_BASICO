import axios from './axios.js'

export const getAlmacen = () => axios.get('/getAlmacen')
export const getProductosNoAlmacen = () => axios.get('/getProductosNoAlmacen')
export const ingresarProductosAlmacen = (producto) => axios.post('ingresarProductoAlmacen', producto)
export const updatExistencia = (producto) => axios.put('updateExistencia', producto)