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
import axios from "axios";
import { Link } from "react-router-dom";
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
        <img src={heroImage} alt="Benefícios para estudantes" className="hero-image" />
        <div className="hero-text">
          <h1>Pagá en hasta 36 cuotas</h1>
          <p>¡Todo en menos de 3 minutos!</p>
          <Link to="/signin" className="btn">Ingresá al Portal</Link>

        </div>
      </div>

  {/* Benefícios */}
<div className="para-alunos-benefits">
  <h2>Con estos beneficios, no postergás tus estudios</h2>
  <div className="benefit-list">
    <div className="benefit-item">
      <img src={creditCardIcon} alt="Cartão de Crédito" />
      <p><strong>Tarjeta de crédito:</strong> Elegí la opción que mejor se adapte a tu presupuesto.</p>
    </div>
    <div className="benefit-item">
      <img src={pixIcon} alt="Pix / Boleto" />
      <p><strong>Transferencia / Pago al contado:</strong> Opciones de pago flexibles para tus estudios.</p>
    </div>
    <div className="benefit-item">
      <img src={boletoIcon} alt="Boleto Parcelado" />
      <p><strong>Cuotas con factura:</strong> Financiá tu curso en hasta 36 cuotas y estudiá con tranquilidad.</p>
    </div>
    <div className="benefit-item">
      <img src={invoiceIcon} alt="Fatura" />
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
<li><i className="fas fa-1"></i> La Institución Educativa que ofrece el curso debe ser nuestro socio.</li>
    <li><i className="fas fa-2"></i> Accedés al link de compra del curso y realizás el pago dentro de la plataforma de Principia.</li>
    <li><i className="fas fa-3"></i> Elegís la forma de pago y el plan de cuotas que mejor se ajuste a tu bolsillo.</li>
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
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleChange}
            required
          />

<label>Correo Electrónico:</label>
<input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />


<label>Mensaje:</label>
<textarea
            name="message"
            placeholder="Nos conte mais sobre seu interesse e como podemos te ajudar"
            value={formData.message}
            onChange={handleChange}
            required
          />

<button type="submit" className="btn">Enviar Solicitud</button>
</form>
      </div>

        {/* Footer */}
        <footer className="home-footer">
        <div className="home-footer-text">
          <p>&copy; 2025 Educacion Plus | Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default ParaAlunos;
