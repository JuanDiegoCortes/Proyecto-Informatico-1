import axios from 'axios'

const API = 'http://localhost:3000/api'

export const registerRequest = user => axios.post(`${API}/register`, user, { withCredentials: true })

export const loginRequest = user => axios.post(`${API}/login`, user, { withCredentials: true })

// Consultas de usuario
export const getQueries = () => axios.get(`${API}/queries`, { withCredentials: true });

export const addQuery = (queryData) => axios.post(`${API}/queries`, queryData, { withCredentials: true });

export const deleteQuery = (id) => axios.delete(`${API}/queries/${id}`, { withCredentials: true });
