import axios from './axios.js'

export const getUsers = () => axios.get('/getUsers')
export const getRoles = () =>axios.get('/getRoles')
export const getEstados = () =>axios.get('/getEstados')
export const userRegister = (user) => axios.post('/registerUser', user)
export const userUpdate = (id, user) => axios.put(`/updateUser/${id}`, user);
export const deleteUser = (id) => axios.delete(`/deleteUser/${id}`)
export const getPersonas = () => axios.get(`/getPersonas`);
export const codigoEnviar = (data) => axios.post('/enviarCodigo', data)
export const verificarCodigo = (data) => axios.post('/verificarCodigo', data)
export const restablecerPass = (data) => axios.post('/restablecerContrasena', data)
