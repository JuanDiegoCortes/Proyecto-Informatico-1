import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000/api';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener los usuarios
    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${API}/users`, { withCredentials: true });
            setUsers(response.data); // Almacenar usuarios en el estado
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Función para eliminar un usuario
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${API}/users/${userId}`, { withCredentials: true });
            // Eliminar el usuario del estado local después de la respuesta exitosa
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (err) {
            setError('Error al eliminar el usuario');
        }
    };

  

    return { users, loading, error, getAllUsers, deleteUser };
};

export default useUsers;
