import axios from './axios.js'
 export const productosParacompras = () => axios.get('/productosParaCompras')
 export const getCompras = () => axios.get('/getCompras')
 export const compraConfirmada = (formData) => axios.post('/compraConfirmada', formData)
