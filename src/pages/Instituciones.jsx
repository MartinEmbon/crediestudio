import React, { useState } from "react";
import "../styles/Instituciones.css";
import Navbar from "../Navbar"; // Public Navbar
import heroImage from "../assets/hero-institucion.png"; 
import creditCardIcon from "../assets/credit-card.avif";
import pixIcon from "../assets/pix.avif";
import boletoIcon from "../assets/credito-institucion.avif";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Instituciones = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "https://contact-form-institution-589432081267.us-central1.run.app",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      alert("Mensaje enviado con éxito.");
      setFormData({ name: "", email: "", message: "", institution: ""}); // Reset form
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("Error al enviar el mensaje. Intenta nuevamente.");
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="hero-instituciones">
        <img src={heroImage} alt="Checkout completo" className="hero-image" />
        <div className="hero-text">
        <h1>Checkout completo para vender tu curso</h1>
          <p>Tené una experiencia de compra simplificada, gestioná tus ventas y obtené más tiempo para enfocarte en lo que importa: la enseñanza.</p>
          <Link to="/contacto" className="btn btn-hero">Contáctanos</Link>

        </div>
      </div>

      {/* Main Content */}
      <div className="instituciones-container">
        <div className="instituciones-main">
        <h2>La manera más simple de que digan 'sí' a tu curso</h2>
        {/* <p>Las principales tarjetas disponibles para cerrar más ventas.</p> */}

          <div className="instituciones-benefits">
            <div className="benefit">
              <img src={creditCardIcon} alt="Cartão de Crédito" />
              <h3>Conversión asegurada</h3>
              <p>Impulsá tus ventas integrando una nueva opción de pago flexible en tu plataforma.</p>
              <ul>
              <li><span className="bullet">✔</span> Bajo costo operativo</li>
              <li><span className="bullet">✔</span> Ingreso inmediato</li>
              <li><span className="bullet">✔</span> Mejor flujo de caja</li>
              </ul>
            </div>

            <div className="benefit">
              <img src={pixIcon} alt="Pix / Boleto" />
              <h3>Crédito a medida para educación</h3>
              <p>Una solución pensada exclusivamente para instituciones educativas.</p>
              <ul>
              <li><span className="bullet">✔</span> Financiación 100% alineada a la duración del curso</li>
              <li><span className="bullet">✔</span> Proceso de análisis automático y ágil</li>
              <li><span className="bullet">✔</span> Aprobación sin bancos ni burocracia</li>
              </ul>
            </div>

            <div className="benefit">
              <img src={boletoIcon} alt="Boleto Parcelado" />
              <h3>Gestión financiera simplificada</h3>
              <p>Olvidate de perseguir pagos o administrar cuotas: todo está automatizado.</p>
              <ul>
              <li><span className="bullet">✔</span> Cobro asegurado desde el primer día</li>
              <li><span className="bullet">✔</span> Plataforma centralizada para seguimiento y reportes</li>
              <li><span className="bullet">✔</span> Soporte especializado para tu equipo</li>
            
              </ul>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="instituciones-form">
        <h2>¡Sumate a nosotros y potenciá tu educación!</h2>
          <form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input type="text" name="name" placeholder="Tu nombre" value={formData.name} onChange={handleChange} required />

            <label>Correo Electrónico:</label>
            <input type="email" name="email" placeholder="Tu correo electrónico" value={formData.email} onChange={handleChange} required />

            <label>Nombre de la Institución:</label>
            <input type="text" name="institution" placeholder="Nombre de tu institución" value={formData.institution} onChange={handleChange} required />

            <label>Mensaje:</label>
            <textarea name="message" placeholder="Contanos sobre tu institución y cómo podemos ayudarte" value={formData.message} onChange={handleChange} required />

            <button type="submit" className="btn">Enviar Solicitud</button>
          </form>
        </div>
      </div>
        
   
       <Footer/>
    </>
  );
};

export default Instituciones;
