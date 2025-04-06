import React, { useState } from "react";
import "../styles/ParaAlunos.css";
import Navbar from "../Navbar"; // Public Navbar
import heroImage from "../assets/hero-image.png";
import creditCardIcon from "../assets/creditcard.avif";
import pixIcon from "../assets/pix.avif";
import boletoIcon from "../assets/boleto.avif";
import invoiceIcon from "../assets/invoice.avif";
import dashboardIcon from "../assets/dashboard.avif";
import whatsappIcon from "../assets/whatsapp.avif";
import creditoInstitution from "../assets/credito-institucion.avif"
import axios from "axios";
import { Link } from "react-router-dom";
import contactHeroImage from "../assets/hero-contacto.png";

import Footer from "../components/Footer";
const ParaAlunos = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role:"student",
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
        "https://contact-form-589432081267.us-central1.run.app",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      alert("Mensaje enviado con éxito.");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert("Error al enviar el mensaje. Intenta nuevamente.");
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-section">
        <img src={contactHeroImage} alt="Benefícios para estudantes" className="hero-image" />
        <div className="hero-text">
          <h1>Educación al alcance de todos</h1>
          <p>¡Financiación flexible para que sigas avanzando!</p>
          <Link to="/signin" className="btn btn-hero">Ingresá al Portal</Link>

        </div>
      </div>

  {/* Benefícios */}
<div className="para-alunos-benefits">
  <h2>Con estos beneficios, no postergás tus estudios</h2>
  <div className="benefit-list">
    <div className="benefit-item">
      <img src={creditCardIcon} alt="Cartão de Crédito" />
      <p><strong>Medios de pago adaptables:</strong> Elegí la opción que mejor se adapte a tu presupuesto.</p>
    </div>
      <div className="benefit-item">
      <img src={invoiceIcon} alt="Cartão de Crédito" />
      <p><strong>Proceso simple y rápido:</strong> Transparencia total en los pagos, sin sorpresas.</p>
    </div>
    <div className="benefit-item">
      <img src={pixIcon} alt="Pix / Boleto" />
      <p><strong>Pago directo:</strong> Opciones de pago flexibles para tus estudios.</p>
    </div>
    <div className="benefit-item">
      <img src={boletoIcon} alt="Boleto Parcelado" />
      <p><strong>Financiación accesible:</strong> Financiá tu curso y estudiá con tranquilidad.</p>
    </div>
    <div className="benefit-item">
      <img src={dashboardIcon} alt="Fatura" />
      <p><strong>Panel del Estudiante:</strong> Toda la información importante en un solo lugar.</p>
    </div>
    <div className="benefit-item">
      <img src={whatsappIcon} alt="WhatsApp" />
      <p><strong>WhatsApp:</strong> Atención personalizada y soporte exclusivo para estudiantes.</p>
    </div>
  </div>
</div>

{/* Como Funciona */}
<div className="como-funciona">
<h2>¿Cómo funciona?</h2>
<ol>
<li><i className="fas fa-1"></i> Elegí tu curso: Accedé al link de compra del curso desde la página de la institución.</li>
    <li><i className="fas fa-2"></i> Seleccioná CrediEstudio como medio de pago en el checkout.</li>
    <li><i className="fas fa-3"></i> Completá tu registro y si tu crédito es aprobado, empezás el curso y pagás en cuotas accesibles.</li>
  </ol>
</div>


      {/* Contato */}
      <div className="para-alunos-form">
      <h2>¿Necesitás atención y soporte para estudiantes?</h2>
      <p>¡Nuestro equipo está listo para ayudarte!</p>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />

<label>Correo Electrónico:</label>
<input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />


<label>Mensaje:</label>
<textarea
            name="message"
            placeholder="Contanos como podemos ayudarte"
            value={formData.message}
            onChange={handleChange}
            required
          />

<button type="submit" className="btn">Enviar Solicitud</button>
</form>
      </div>

      <Footer/>
    </>
  );
};

export default ParaAlunos;
