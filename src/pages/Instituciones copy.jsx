import React, { useState } from "react";
import "../styles/Instituciones.css";
import Navbar from "../Navbar"; // Public Navbar

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("Mensaje enviado con éxito.");
  };

  return (
    <>
    <Navbar/>

    <div className="instituciones-container">

      <div className="instituciones-header">
        <h1>Beneficios para Instituciones</h1>
        <p>Conoce cómo nuestra plataforma puede apoyar a tu institución.</p>
      </div>

      <div className="instituciones-benefits">
        <h2>¿Por qué asociarte con nosotros?</h2>
        <ul>
          <li><strong>Acceso a planes de educación flexibles:</strong> Ofrecemos opciones personalizadas para las necesidades de tu institución.</li>
          <li><strong>Expande tu oferta educativa:</strong> Amplía la variedad de cursos que puedes ofrecer a tus estudiantes.</li>
          <li><strong>Herramientas de gestión integradas:</strong> Gestiona el progreso de tus estudiantes de manera eficiente.</li>
          <li><strong>Soporte constante:</strong> Nuestro equipo está disponible para ayudarte en cada paso del proceso.</li>
        </ul>
      </div>

      <div className="instituciones-form">
        <h2>¡Únete a nosotros y potencia tu educación!</h2>
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
            placeholder="Tu correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Nombre de la Institución:</label>
          <input
            type="text"
            name="institution"
            placeholder="Nombre de tu institución"
            value={formData.institution}
            onChange={handleChange}
            required
          />

          <label>Mensaje:</label>
          <textarea
            name="message"
            placeholder="Cuéntanos más sobre tu institución y cómo podemos ayudarte"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">Enviar Solicitud</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Instituciones;
