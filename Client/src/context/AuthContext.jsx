import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, checkAuth, logoutRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
    };
    verifyAuth();
  }, []);

  const signup = async (user) => {
    try {
        const res = await registerRequest(user); // Ahora res debería contener el objeto de respuesta completo
        if (res && res.data) { // Verifica que res y res.data existan
            console.log(res.data);
            setUser(res.data);
            setRole(res.data.role);
            setIsAuthenticated(true);
        } else {
            throw new Error("No se recibieron datos de respuesta en la solicitud de registro.");
        }
    } catch (error) {
        console.log(error.response || error.message);
        setErrors(error.response ? error.response.data.message : "Ocurrió un error en el registro.");
    }
};

  const signin = async (user, callback) => {
    try {
        const res = await loginRequest(user);
        console.log(res);
        setUser(res.data);
        console.log(setUser);
        setRole(res.data.role);
        console.log(setRole);
        setIsAuthenticated(true);
        if (callback) callback(res.data.role);
    } catch (error) {
        console.log(error.response);
        setErrors(error.response.data.message);
    }
};

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        role,
        logout,
        user,
        isAuthenticated,
        setIsAuthenticated,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};