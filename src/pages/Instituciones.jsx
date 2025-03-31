import React, { useState } from "react";
import "../styles/Instituciones.css";
import Navbar from "../Navbar"; // Public Navbar
import heroImage from "../assets/hero-institucion.png"; 
import creditCardIcon from "../assets/credit-card.avif";
import pixIcon from "../assets/pix.avif";
import boletoIcon from "../assets/credito-institucion.avif";
import axios from "axios";

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
          <button className="btn">Contáctanos</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="instituciones-container">
        <div className="instituciones-main">
        <h2>Vende con tarjeta al contado o en hasta 12 cuotas, con o sin intereses.</h2>
        <p>Las principales tarjetas disponibles para cerrar más ventas.</p>

          <div className="instituciones-benefits">
            <div className="benefit">
              <img src={creditCardIcon} alt="Cartão de Crédito" />
              <h3>Tarjeta de crédito</h3>
              <p>Vende al contado de forma simple, rápida y sin comisiones por emisión. Asegurá tus ventas con:</p>
              <ul>
              <li><span className="bullet">✔</span> Bajo costo operativo</li>
              <li><span className="bullet">✔</span> Ingreso inmediato</li>
              <li><span className="bullet">✔</span> Mejor flujo de caja</li>
              </ul>
            </div>

            <div className="benefit">
              <img src={pixIcon} alt="Pix / Boleto" />
              <h3>Boleto/Pix al contado</h3>
              <p>Vende tus cursos en hasta 36 cuotas con boleto bancario o Pix con financiamiento sin complicaciones.</p>
              <ul>
              <li><span className="bullet">✔</span> Alcanzá a personas sin tarjeta de crédito</li>
              <li><span className="bullet">✔</span> Aumentá la conversión</li>
              <li><span className="bullet">✔</span> Menos comisiones y burocracia</li>
              </ul>
            </div>

            <div className="benefit">
              <img src={boletoIcon} alt="Boleto Parcelado" />
              <h3>Crédito educativo</h3>
              <p>Vende un 35% más que en otros checkouts con nuevas formas de pago.</p>
              <ul>
              <li><span className="bullet">✔</span> Aumento de la conversión con tecnología inteligente</li>
              <li><span className="bullet">✔</span> Recursos centralizados para la gestión financiera</li>
              <li><span className="bullet">✔</span> Operación autónoma con soporte especializado</li>
            
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
            <textarea name="message" placeholder="Cuéntanos más sobre tu institución y cómo podemos ayudarte" value={formData.message} onChange={handleChange} required />

            <button type="submit" className="btn">Enviar Solicitud</button>
          </form>
        </div>
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

export default Instituciones;
