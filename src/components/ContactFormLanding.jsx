import React, { useState } from "react";
import "../styles/ContactFormLanding.css"; 

import axios from "axios";
const ContactFormLanding = () => {
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
    <div className="contact-container">
      <h2>¿Dudas? Escribinos!</h2>

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

        <label>Sos estudiante o institución?</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Estudiante</option>
          <option value="institution">Institución</option>
        </select>

        <button type="submit" className="btn">Enviar</button>
      </form>
    </div>
  );
};

export default ContactFormLanding;
