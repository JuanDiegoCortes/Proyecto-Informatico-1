import React, { useEffect } from 'react';
import './HomePage.css';
import MomImage from './Images/ecografias.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { checkAuth } from '../api/auth'; // Asegúrate de importar checkAuth

function HomePage() {
  const { user, isAuthenticated, setIsAuthenticated, setUser, logout } = useAuth();
  const navigate = useNavigate();

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
  }, [setIsAuthenticated, setUser]);

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          {isAuthenticated ? (
            <>
              {/* Mostrar la sección correspondiente según el rol del usuario */}
              {user && user.role === 'doctor' && (
                <li><Link to="/doctor">Doctor Section</Link></li>
              )}
              {user && user.role === 'admin' && (
                <li><Link to="/admin">Admin Dashboard</Link></li>
              )}
              {user && user.role === 'user' && (
                <li><Link to="/consult">Consultar</Link></li>
              )}
              <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      <section className="motivational">
        <h1>Acompañándote en cada paso de tu embarazo</h1>
        <p>Un cuidado especial para ti y tu bebé, brindando soluciones tecnológicas para monitorear cada etapa.</p>
      </section>

      <section className="about-us">
        <div className="about-image">
          <img src={MomImage} alt="Madre con bebé" />
        </div>
        <div className="about-text">
          <h2>¿Quiénes Somos?</h2>
          <p>Somos DevTechs una empresa comprometida con el bienestar de las futuras madres, ofreciendo soluciones innovadoras para hacer de su experiencia algo seguro y eficiente.</p>
          <button className="consult-btn">Consultar</button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
