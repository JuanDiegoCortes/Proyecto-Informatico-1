import axios from 'axios';

const API = 'http://localhost:3000/api';

// Crear una nueva cita
export const createAppointmentRequest = (appointmentData) => 
    axios.post(`${API}/appointments`, appointmentData, { 
        withCredentials: true 
    });

// Obtener todas las citas del usuario
export const getAppointmentsByUserRequest = () => 
    axios.get(`${API}/appointments`, { 
        withCredentials: true 
    });

// Obtener el diagnóstico de una cita
export const getDiagnosticByAppointmentRequest = (appointmentId) => 
    axios.get(`${API}/appointments/${appointmentId}/diagnosis`, { 
        withCredentials: true 
    });
