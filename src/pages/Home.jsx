import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Home.css"; // CSS con los estilos
import Navbar from "../Navbar"; // Public Navbar
import heroImage from "../assets/hero-home.png"
const Home = () => {
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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado:", formData);
        alert("Mensaje enviado con éxito.");
      };

  return (
    <div className="home-container">
     {/* Hero Section */}
<Navbar />
<section className="hero-section">
  <img src={heroImage} alt="Soluções para Educação" className="hero-image" />
  <div className="hero-text">
  <h1>Soluciones para Educación</h1>
  <p>
            Aseguramos estabilidad financiera, menos deserción y más inscripciones
            para que puedas enfocarte en lo más importante: la enseñanza.
          </p>
    <Link to="/contact" className="btn">FALE CONOSCO</Link>
  </div>
</section>



      {/* Receita Garantida */}
      <section className="home-receita">
      <h2>INGRESOS GARANTIZADOS</h2>
        <p>
          Aseguramos el 100% de las cuotas en la fecha programada, sin morosidad.
          Checkout completo y crédito accesible para posgrados, cursos y capacitaciones.
        </p>
      </section>

{/* PrincipiaPay */}
<section className="home-principiapay">
  <h2>CrediEstudio</h2>
  <div className="home-principiapay-list">
    <div className="home-principiapay-item">
      <i className="fas fa-chart-line"></i> {/* Icono FontAwesome */}
      <h3>Gestión Financiera</h3>
            <p>Mayor conversión, cero morosidad y reducción de la deserción.</p>
    </div>
    <div className="home-principiapay-item">
      <i className="fas fa-arrow-down"></i> {/* Icono FontAwesome */}
      <h3>Menos Deserción</h3>
      <p>Menos trámites y más foco en el aprendizaje.</p>
    </div>
    <div className="home-principiapay-item">
      <i className="fas fa-money-check-alt"></i> {/* Icono FontAwesome */}
      <h3>Más Liquidez</h3>
      <p>Gestión de cobranza eficiente y reducción de costos operativos.</p>
    </div>
  </div>
</section>

   {/* Como Funciona */}
<section className="home-como-funciona">
  <h2>COMO FUNCIONA</h2>
  <ol>
    <li><i className="fas fa-building"></i> Parceria com a instituição de ensino, onboarding com estudantes e faturamento simplificado.</li>
    <li><i className="fas fa-calendar-check"></i> Instituições recebem na data acordada, com mais dinheiro em caixa e menos trabalho.</li>
  </ol>
</section>


 {/* Benefícios para quem ensina */}
<section className="home-beneficios">
<h2>Beneficios para Docentes</h2>
  <div className="home-beneficios-list">
    <div className="home-beneficio">
      <i className="fas fa-credit-card"></i>
      <h3>Pago Simple</h3>
            <p>Pagos fáciles con transferencia, tarjeta o efectivo.</p>
    </div>
    <div className="home-beneficio">
      <i className="fas fa-money-check-alt"></i>
      <h3>Financiamiento</h3>
            <p>Crédito accesible para cursos y capacitaciones.</p>
    </div>
    <div className="home-beneficio">
      <i className="fas fa-calendar-alt"></i>
      <h3>Portal de Pagos</h3>
            <p>Beneficios por pagos en término y gestión digital simplificada.</p>
    </div>
  </div>
</section>


   {/* Porque Usar PrincipiaPay */}
<section className="home-porque-usar">
<h2>¿Por qué elegir CrediEstudio?</h2>
<div className="home-porque-usar-list">
    <div className="home-porque-usar-item">
    <p><strong>Más ventas:</strong> Aumentá hasta un 35% tus ventas con nuevas opciones de pago.</p>
    <i className="fas fa-chart-line"></i>
    </div>
    <div className="home-porque-usar-item">
    <p><strong>Equipo de especialistas:</strong> Mejorá tu conversión con un equipo dedicado trabajando para vos.</p>
    <i className="fas fa-users"></i>
    </div>
    <div className="home-porque-usar-item">
    <p><strong>Impulsá tu negocio:</strong> Vendé tanto en lanzamientos como en cursos permanentes con la mejor anticipación del mercado.</p>
    <i className="fas fa-rocket"></i>
    </div>
    <div className="home-porque-usar-item">
    <p><strong>Menos trámites:</strong> Nos encargamos de la gestión financiera y negociación de estudiantes morosos.</p>
    <i className="fas fa-sitemap"></i>
    </div>
    <div className="home-porque-usar-item">
    <p><strong>Resultados más rápidos:</strong> Obtené previsibilidad en tus ingresos e invertí en tu institución mientras potenciamos tus ventas.</p>
    <i className="fas fa-tachometer-alt"></i>
    </div>
    <div className="home-porque-usar-item">
    <p><strong>Asesoramiento personalizado:</strong> Contá con un Gerente de Éxito enfocado en tus estrategias y lanzamientos.</p>
    <i className="fas fa-user-tie"></i>
    </div>
  </div>
</section>

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
  
          <label>¿Eres estudiante o institución?</label>
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
          <p>&copy; 2025 Educacion Plus | Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
