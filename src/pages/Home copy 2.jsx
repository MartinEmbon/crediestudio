import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // CSS con los estilos
import Navbar from "../Navbar"; // Public Navbar

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <Navbar />
      <section className="home-hero">
        <div className="home-hero-text">
          <h1>Impulsa tu educación con la flexibilidad que necesitas</h1>
          <p>
            Ofrecemos planes de pago accesibles y flexibles para que puedas
            estudiar con facilidad, sin preocupaciones.
          </p>
          {/* <div className="home-hero-buttons">
            <Link to="/signup" className="btn">Regístrate</Link>
            <Link to="/login" className="btn">Iniciar Sesión</Link>
          </div> */}
        </div>
      </section>

      {/* Beneficios */}
      <section className="home-benefits">
        <h2>Beneficios para Estudiantes</h2>
        <div className="home-benefits-list">
          <div className="home-benefit">
            <h3>Planes de Pago Flexibles</h3>
            <p>Escoge el plan que mejor se adapte a tus necesidades financieras.</p>
          </div>
          <div className="home-benefit">
            <h3>Cursos de Alta Calidad</h3>
            <p>Accede a contenido educativo de alta calidad, con expertos en el área.</p>
          </div>
          <div className="home-benefit">
            <h3>Proceso de Inscripción Rápido</h3>
            <p>Entra en acción rápidamente con nuestro proceso de inscripción simplificado.</p>
          </div>
          <div className="home-benefit">
            <h3>Soporte 24/7</h3>
            <p>Te ayudamos siempre que lo necesites, con asistencia disponible en todo momento.</p>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="home-testimonials">
        <h2>Lo que dicen nuestros estudiantes</h2>
        <div className="home-testimonial">
          <p>
            “Gracias a los planes de pago, pude continuar con mis estudios
            sin preocupaciones. La plataforma es increíble.”
          </p>
          <p>- Juan Pérez, Estudiante de Marketing Digital</p>
        </div>
        <div className="home-testimonial">
          <p>
            “Los cursos son muy completos y los tutores siempre están ahí
            para ayudarme.”
          </p>
          <p>- Laura Gómez, Estudiante de Diseño Gráfico</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-text">
          <p>&copy; 2025 Educacion Plus | Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
