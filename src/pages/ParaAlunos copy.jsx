import React, { useState } from "react";
import "../styles/ParaAlunos.css";
import Navbar from "../Navbar"; // Public Navbar

const ParaAlunos = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
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
   
    <div className="para-alunos-container">
      <div className="para-alunos-header">
        <h1>Beneficios para Estudiantes</h1>
        <p>Descubre cómo nuestra plataforma puede ayudarte a financiar tu educación.</p>
      </div>

      <div className="para-alunos-benefits">
        <h2>¿Por qué elegirnos?</h2>
        <ul>
          <li><strong>Planes de pago flexibles:</strong> Ofrecemos opciones adaptadas a tu situación financiera.</li>
          <li><strong>Acceso a cursos de alta calidad:</strong> Estudia con expertos en diversas áreas del conocimiento.</li>
          <li><strong>Proceso de inscripción fácil:</strong> Regístrate rápidamente y empieza a aprender.</li>
          <li><strong>Apoyo constante:</strong> Nuestro equipo está aquí para ayudarte en todo momento.</li>
        </ul>
      </div>

      <div className="para-alunos-form">
        <h2>¡Inscríbete y empieza a aprender hoy!</h2>
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

          <label>Curso de Interés:</label>
          <input
            type="text"
            name="course"
            placeholder="Curso que te interesa"
            value={formData.course}
            onChange={handleChange}
            required
          />

          <label>Mensaje:</label>
          <textarea
            name="message"
            placeholder="Cuéntanos más sobre tu interés y cómo podemos ayudarte"
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

export default ParaAlunos;
