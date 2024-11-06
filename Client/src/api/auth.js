import axios from 'axios'

const API = 'http://localhost:3000/api';

export const registerRequest = user => axios.post(`${API}/register`, user, { withCredentials: true })

export const loginRequest = user => axios.post(`${API}/login`, user, { withCredentials: true })

export const registerDoctorRequest = doctor => axios.post(`${API}/register-doctor`, doctor, { withCredentials: true })

export const getAppointmentsRequest = doctorId => axios.get(`${API}/appointments/${doctorId}`, { withCredentials: true });
