import React, { useState } from "react";
import Navbar from "../Navbar";
import "../styles/SignUp.css"; // Asegúrate de que tu CSS esté bien configurado
import signinphoto from "../assets/signin.png"
const SignUp = () => {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [password, setPassword] = useState("");
  const [institutionDetails, setInstitutionDetails] = useState({
    name: "",
    contactEmail: "",
    phone: ""
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    // Aquí va la lógica de registro para estudiantes (si fuera necesario)
    console.log("Usuario registrado:", { email, password, role });
  };

  const handleInstitutionContact = (e) => {
    e.preventDefault();
    // Lógica para enviar los detalles de contacto a tu equipo
    console.log("Detalles de contacto de institución:", institutionDetails);
    // Tal vez redirigir a una página de agradecimiento o mostrar un mensaje de éxito
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        {/* Left Side - Registration Form */}
        <div className="signup-left">
          {/* Condicionar el título según el rol */}
          {role === "institution" ? (
            <>
              <h2>Formulario de Contacto para Instituciones</h2>
              <p>Por favor, complete el formulario para que uno de nuestros asesores se ponga en contacto con usted.</p>
            </>
          ) : (
            <>
              <h2>Regístrate en CrediEstudio</h2>
              <p>Únete y obtén acceso a financiamiento educativo.</p>
            </>
          )}

          {/* Step 1: Select Role */}
          {!role ? (
            <div className="role-selection">
              <h3>¿Qué tipo de usuario eres?</h3>
              <button onClick={() => setRole("student")} className="btn">
                Soy Estudiante
              </button>
              <button onClick={() => setRole("institution")} className="btn">
                Soy Institución
              </button>
            </div>
          ) : (
            /* Step 2: Form Based on Role */
            role === "institution" ? (
              // Formulario de contacto para instituciones
              <form onSubmit={handleInstitutionContact} className="contact-form">
                <input
                  type="text"
                  placeholder="Nombre de la Institución"
                  value={institutionDetails.name}
                  onChange={(e) => setInstitutionDetails({ ...institutionDetails, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Correo electrónico de contacto"
                  value={institutionDetails.contactEmail}
                  onChange={(e) => setInstitutionDetails({ ...institutionDetails, contactEmail: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Teléfono de contacto"
                  value={institutionDetails.phone}
                  onChange={(e) => setInstitutionDetails({ ...institutionDetails, phone: e.target.value })}
                  required
                />
                <button type="submit" className="btn">
                  Enviar Consulta
                </button>
                {/* Back Button to Step 1 */}
              <button 
                type="button" 
                onClick={() => setRole(null)} 
                className="btn back-btn"
                style={{ marginTop: "10px", backgroundColor: "#ccc", color: "#000" }}
              >
                Volver a seleccionar tipo de usuario
              </button>
              </form>
            ) : (
              /* Step 2: Show Registration Form for Students */
              <form onSubmit={handleSignUp} className="signup-form">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="btn">
                  Crear Cuenta
                </button>
                {/* Back Button to Step 1 */}
              <button 
                type="button" 
                onClick={() => setRole(null)} 
                className="btn back-btn"
                style={{ marginTop: "10px", backgroundColor: "#ccc", color: "#000" }}
              >
                Volver a seleccionar tipo de usuario
              </button>
              </form>
            )
          )}
        </div>

        {/* Right Side - Image or Content */}
        <div className="signup-right">
        <h3>Financia tu futuro</h3>
        <p>Descubre cómo nuestros créditos educativos pueden ayudarte.</p>
          <img src={signinphoto} alt="CrediEstudio" />
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

export default SignUp;
