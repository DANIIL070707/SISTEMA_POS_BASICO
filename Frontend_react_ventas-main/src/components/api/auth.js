import axios from './axios.js'

export const LoginRequest = (user) => axios.post(`/login`, user)
export const getUserToken = (payload) => axios.post(`/getUserToken`, payload)
export const RolEnTiempo = (payload) => axios.post('/verificarRolEnTiempo', payload)

