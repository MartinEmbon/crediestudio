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
        <h1>Transformá tu audiencia en ingresos reales</h1>
        <p>
        Ofrecé tus cursos con financiación flexible, cobrá al contado y simplificá la gestión de pagos con la solución más ágil del mercado.

        </p>
          <button className="btn btn-hero">Contáctanos</button>
        </div>
      </div>
  
      <ContactFormLanding/>
    
    <Footer/>
    </>
  );
}

export default Contacto;
