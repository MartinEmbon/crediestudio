import React, { useState } from "react";
import "../styles/Contacto.css";
 import Navbar from "../Navbar"; // Public Navbar
 import contactHeroImage from "../assets/hero-contacto.png";
import axios from "axios";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    role: "student",
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
      setFormData({ name: "", email: "", message: "", role: "student" }); // Reset form
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
        <img src={contactHeroImage} alt="Transforme sua audiência em lucro" className="hero-image" />
        <div className="hero-text">
        <h1>Transformá tu audiencia en ganancias</h1>
        <p>
          Ofrecé tus infoproductos con opciones de pago, recibí al contado y convertí hasta un 35% más con la
          mayor aprobación y agilidad del mercado.
        </p>
          <button className="btn">Contáctanos</button>
        </div>
      </div>
  
      {/* Contact Form */}
      <div className="contact-container">
      <h2>Contacto</h2>
      <p>Dejanos tu mensaje y nos pondremos en contacto con vos.</p>
  
        <form onSubmit={handleSubmit} className="contact-form">
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
            placeholder="Tu correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
  
          <label>Mensaje:</label>
          <textarea
            name="message"
            placeholder="Escribí tu mensaje aquí..."
            value={formData.message}
            onChange={handleChange}
            required
          />
  
  <label>¿Sos estudiante o institución?</label>
  <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Estudiante</option>
            <option value="institution">Institución</option>
          </select>
  
          <button type="submit" className="btn">Enviar</button>
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
}

export default Contacto;
