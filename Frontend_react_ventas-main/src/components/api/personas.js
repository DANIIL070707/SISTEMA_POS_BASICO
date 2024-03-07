import axios from './axios.js'

export const getPersonas = () => axios.get('/getPersonasTabla')
export const registerPersona = (persona) => axios.post('/createPersona', persona)
export const updatePersona = (id_persona, persona) => axios.put(`/updatePersona/${id_persona}`, persona)
export const deletePersona = (id_persona) => axios.delete(`/deletePersona/${id_persona}`)