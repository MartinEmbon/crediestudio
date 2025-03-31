import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/SignIn.css";
import { useNavigate  } from "react-router-dom";
import Navbar from "../Navbar"; // Public Navbar

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleSignIn = (e) => {

    e.preventDefault();
    console.log("User signed in:", { email, password });
    navigate("/dashboard");  // Redirect user after login

  };
  const handleGoogleLoginSuccess = (response) => {
    console.log("Google Sign In Success:", response);
    navigate("/dashboard"); // ✅ Redirect after Google login
  };
  return (
    <>
    <Navbar/>
  
    <div className="signin-container">
      <div className="signin-left">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSignIn}>
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
          <button type="submit" className="btn">Ingresar</button>
        </form>
        <p>O inicia sesión con Google:</p>
        <GoogleLogin onSuccess={handleGoogleLoginSuccess} theme="filled_blue" />
      </div>

      <div className="signin-right">
        <h3>Financia tu educación</h3>
        <p>Accede a planes de pago flexibles para estudiar sin preocupaciones.</p>
        <img src="/assets/education-finance.jpg" alt="CrediEstudio" />
      </div>
    </div>
    </>
  );
};

export default SignIn;
