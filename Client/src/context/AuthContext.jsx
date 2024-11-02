import {createContext, useState, useContext} from 'react'
import {registerRequest, loginRequest} from "../api/auth"
import { registerDoctorRequest } from "../api/auth";


export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const signup = async(user) =>{
        try {
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data.message)
        }
    };

    const signin = async (user, callback) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
            if (callback) callback();
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data.message);
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/logout');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.log(error.response);
        }
    };

    const signupDoctor = async(doctorData) => {
        try {
            const res = await registerDoctorRequest(doctorData);
            console.log(res.data); // Para ver la respuesta en consola
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response);
            const message = error.response?.data?.message || 'An unexpected error occurred';
            setErrors([message]);
        }
    };
    
    return (
        <AuthContext.Provider 
        value={{
            signup,
            signin,
            logout,
            signupDoctor,
            user,
            isAuthenticated,
            errors
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}