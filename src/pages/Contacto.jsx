import React, { useState } from "react";
import "../styles/Contacto.css";
 import Navbar from "../Navbar"; // Public Navbar
 import contactHeroImage from "../assets/hero-contacto.png";
import axios from "axios";
import Footer from "../components/Footer";
import ContactFormLanding from "../components/ContactFormLanding";

const Contacto = () => {
  
  return (
    <>
      <Navbar />
  
      {/* Hero Section */}
      <div className="hero-section">
        <img src={contactHeroImage} alt="Transforme sua audiência em lucro" className="hero-image" />
        <div className="hero-text">
        <h1>Transformá tu audiencia en ganancias</h1>
        <p>
          Ofrecé tus cursos con opciones de pago, recibí al contado y convertí hasta un 35% más con la
          mayor aprobación y agilidad del mercado.
        </p>
          <button className="btn">Contáctanos</button>
        </div>
      </div>
  
      <ContactFormLanding/>
    
    <Footer/>
    </>
  );
}

export default Contacto;
