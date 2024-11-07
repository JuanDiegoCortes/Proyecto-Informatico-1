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

// Asignar un doctor a una cita específica
export const assignDoctorToAppointmentRequest = (appointmentId, doctorId) =>
    axios.put(`${API}/appointments/${appointmentId}/assign-doctor`, { doctorId }, {
        withCredentials: true
    });