import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css"
import Footer from "../components/Footer";
import Navbar from "../Navbar";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    // Extraer token de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (!tokenFromUrl) {
      setError("Token no válido o expirado.");
    } else {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleResetPassword = async () => {
    if (!newPassword) {
      setError("Ingresá una nueva contraseña.");
      return;
    }

    try {
      await axios.post(
        "https://update-password-reset-589432081267.us-central1.run.app",
        { token, newPassword }
      );

      setSuccess(true);
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      setError("El token es inválido o ha expirado.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="reset-container">
      <div className="reset-card">
        <h2 className="reset-title">Restablecer Contraseña</h2>
        {error && <p className="error-text">{error}</p>}
        {success ? (
          <p className="success-text">¡Contraseña actualizada! Redirigiendo...</p>
        ) : (
          <div className="reset-form">
            <input
              type="password"
              placeholder="Introdució nueva contraseña"
              className="reset-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="reset-btn" onClick={handleResetPassword}>
              Restablecer
            </button>
          </div>
        )}
      </div>
 
    </div>
    <Footer/>
    </>

  );
  
};

export default ResetPassword;
