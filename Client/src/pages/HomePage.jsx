import React from 'react';
import './HomePage.css';
import MomImage from './Images/ecografias.jpg';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/consult">Consultar</Link></li>
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