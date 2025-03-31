import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="home-content">
        <h1>Tu futuro empieza aquí</h1>
        <p>Accede a créditos educativos con nuestras instituciones aliadas.</p>
        <div className="home-buttons">
          <Link to="/solicitar-credito" className="btn btn-primary">
            Solicitar Crédito
          </Link>
          <Link to="/instituciones" className="btn btn-outline">
            Ver Instituciones
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
