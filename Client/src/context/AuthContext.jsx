import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, checkAuth, logoutRequest } from "../api/auth";
import Cookies from 'js-cookie';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    verifyAuth();
  }, []);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user, callback) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(res.data));
      Cookies.set('token', res.data.token);
      if (callback) callback();
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
      localStorage.removeItem('user');
      Cookies.remove('token');
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
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