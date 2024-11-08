import axios from 'axios';

const API = 'http://localhost:3000/api';

export const listAllAppointments = (doctorId) => 
    axios.get(`${API}/appointments/${doctorId}`, { withCredentials: true });

export const uploadDiagnosticVideo = (appointmentId, formData) => 
    axios.post(`${API}/upload/${appointmentId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
    });