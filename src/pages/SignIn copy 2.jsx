import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice"; // Import Redux action
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar"; // Public Navbar
import "../styles/SignIn.css";
import signinphoto from "../assets/signin.png"
// Mock Users for Testing
const mockUsers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juanperez@example.com",
    role: "student",
  },
  {
    id: 2,
    name: "Instituto Educativo ABC",
    email: "admin@institutoabc.com",
    role: "institution",
  }
];

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Use Redux dispatch

  const handleSignIn = (e) => {
    e.preventDefault();

    // Simulating user authentication
    const user = mockUsers.find((u) => u.email === email);

    if (user) {
      console.log("User signed in:", user);

      // ✅ Store user info & role in Redux
      dispatch(setUser({ userInfo: { name: user.name, email: user.email }, userRole: user.role }));

      // Redirect based on role
      if (user.role === "student") {
        navigate("/dashboard");
      } else if (user.role === "institution") {
        navigate("/dashboard-institution");
      }
    } else {
      alert("Usuario no encontrado. Verifica tu correo.");
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google Sign In Success:", response);
    // Assume Google login user is a student for now
    dispatch(setUser({ userInfo: { name: "Google User", email: "google@example.com" }, userRole: "student" }));
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
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
          <img src={signinphoto} alt="CrediEstudio" />
        </div>
      </div>
    </>
  );
};

export default SignIn;
