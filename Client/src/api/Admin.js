// src/api/Admin.js
import axios from 'axios';

// Configura la base URL del backend
const API_URL = 'http://localhost:3000/api';

// Obtener todos los usuarios
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

// Obtener un usuario por ID
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw new Error(`Failed to fetch user with ID ${userId}`);
  }
};

// Actualizar un usuario
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw new Error(`Failed to update user with ID ${userId}`);
  }
};

// Eliminar un usuario
export const deleteUser = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required for deletion');
  }

  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, { withCredentials: true });
    return response.data;  // Retorna la respuesta de la eliminación para que pueda ser utilizada
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw new Error(`Failed to delete user with ID ${userId}`);
  }
};

// Asignar un doctor a una cita
export const assignDoctorToAppointment = async (appointmentId, doctorId) => {
  try {
    const response = await axios.put(`${API_URL}/doctor/assign/${appointmentId}`, { doctorId }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Error assigning doctor to appointment ${appointmentId}:`, error);
    throw new Error(`Failed to assign doctor to appointment ${appointmentId}`);
  }
};
