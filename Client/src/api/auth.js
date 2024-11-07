import axios from 'axios'

const API = 'http://localhost:3000/api'

export const registerRequest = async (user) => {
    try {
        const response = await axios.post(`${API}/register`, user, { withCredentials: true });
          console.log(response.data);
          return response;
      
    } catch (error) {
        console.error("Register request error:", error.response?.data || error.message);
        throw error; // Puedes elegir si devolver el error o manejarlo
    }
};

export const loginRequest = user => axios.post(`${API}/login`, user, { withCredentials: true })

export const logoutRequest = () => axios.post(`${API}/logout`, {}, { withCredentials: true })

export const checkAuth = async () => {
    const response = await axios.get(`${API}/checkAuth`, { withCredentials: true });
    return response.data.isAuthenticated;
};

export const getQueries = () => axios.get(`${API}/queries`, { withCredentials: true });

export const addQuery = (queryData) => axios.post(`${API}/queries`, queryData, { withCredentials: true });

export const deleteQuery = (id) => axios.delete(`${API}/queries/${id}`, { withCredentials: true });
