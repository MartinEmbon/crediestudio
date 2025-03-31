import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import Navbar from "../Navbar"; // Public Navbar

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Initialize navigate hook

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("User registered with:", { email, password });
  };

  const handleSignUpSuccess = (response) => {
    console.log("Google User signed up:", response);
    // After successful Google login, redirect to the dashboard
    navigate("/dashboard");
  };

  return (
    <>
    <Navbar/>
    
    <div className="signup-container">
      {/* Left Side - Registration Form */}
      <div className="signup-left">
        <h2>Regístrate en CrediEstudio</h2>
        <p>Únete y obtén acceso a financiamiento educativo.</p>
        
        {/* Manual Sign-Up Form */}
        <form onSubmit={handleSignUp} className="signup-form">
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
          <button type="submit" className="btn">Crear Cuenta</button>
        </form>

        <p>O regístrate con Google:</p>
        <GoogleLogin onSuccess={handleSignUpSuccess} theme="filled_blue" />
      </div>

      {/* Right Side - Information Section */}
      <div className="signup-right">
        <h3>Financia tu futuro</h3>
        <p>Descubre cómo nuestros créditos educativos pueden ayudarte.</p>
        <img src="/assets/education-loan.jpg" alt="Financia tu educación" />
      </div>
    </div>
    </>
  );
};

export default SignUp;
