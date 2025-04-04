import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice"; // Import Redux action
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar"; // Public Navbar
import "../styles/SignIn.css";
import signinphoto from "../assets/signin.png";
import axios from "axios";
import Footer from "../components/Footer";

const SignInAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://admin-login-589432081267.us-central1.run.app", // ✅ Admin-only endpoint
        { email, password }
      );

      const userData = response.data.user;

      if (userData.role !== "admin") {
        setError("Acceso denegado. Solo administradores pueden ingresar.");
        return;
      }

      // ✅ Store user info in Redux & localStorage
      dispatch(setUser({ userInfo: { name: userData.name, email: userData.email }, userRole: userData.role }));
      localStorage.setItem("userName", userData.name);
      localStorage.setItem("userEmail", userData.email);
      localStorage.setItem("userRole", userData.role);

      // ✅ Redirect admins to /admin-applications
      navigate("/admin-applications");

    } catch (error) {
      console.error("Sign-in error:", error);
      setError(error.response?.data || "Error al iniciar sesión.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="signin-left">
          <h2>Iniciar sesión como Administrador</h2>
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
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="signin-right">
          <h3>Acceso Administrativo</h3>
          <p>Solo los administradores autorizados pueden ingresar.</p>
          <img src={signinphoto} alt="Admin Access" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignInAdmin;
