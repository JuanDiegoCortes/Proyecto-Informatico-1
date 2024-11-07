import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { checkAuth } from '../api/auth';
import adminImage from './Images/admin.jpg'
import './HomePage.css';

function AdminHomePage() {
    const { isAuthenticated, setIsAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            const authStatus = await checkAuth();
        };

        verifyAuth();
    }, [setIsAuthenticated, navigate]);

    const handleLogout = async () => {
        await logout(); 
        setIsAuthenticated(false); 
        navigate('/login'); 
    };

  return (
    <div className="admin-home">
      <nav className="admin-navbar">
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/consults">Consultas</Link></li>
          <li><Link to="/admin/users">Usuarios</Link></li>
          <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <section className="admin-dashboard">
        <h1>Bienvenido al Panel de Administración</h1>
        <p>Administra y supervisa el sistema, consulta estadísticas y gestiona usuarios.</p>
      </section>

      <section className="admin-about">
      <div className="about-image">
          <img src={adminImage} alt="Admin Image" />
        </div>
        <div className="admin-text">
          <h2>Panel de Control</h2>
          <p>Este es tu centro de operaciones para gestionar el sistema y asegurar una experiencia óptima para los usuarios y doctores.</p>
          <button className="manage-btn">
            <Link to="/admin/consults">Ver Consultas</Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminHomePage;
