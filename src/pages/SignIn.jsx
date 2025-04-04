import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice"; // Import Redux action
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar"; // Public Navbar
import "../styles/SignIn.css";
import signinphoto from "../assets/signin.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Footer from "../components/Footer";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]=useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Use Redux dispatch

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            "https://user-login-589432081267.us-central1.run.app",
            { email, password }
        );
        console.log("Full response:", response.data); // Log the full response

        const userData = response.data.user;
// console.log("Userdata hey",userData)
        // Store user info in Redux
        dispatch(setUser({ userInfo: { name: userData.name, email: userData.email }, userRole: userData.role }));

         // ✅ Store user info in localStorage for persistence


         localStorage.setItem("userName", userData.name);
         localStorage.setItem("userEmail", userData.email);
         localStorage.setItem("userRole", userData.role); // ✅ Fix: Only store role, not entire object
         
         console.log(localStorage.userData)
        // Redirect based on role
        navigate(userData.role === "student" ? "/dashboard" : "/dashboard-institution");

    } catch (error) {
        console.error("Sign-in error:", error);  // Added logging for debugging
        setError("Usuario o contraseña incorrectos. Por favor, verificá tus datos e intentá nuevamente.");

        // setError(error.response?.data || "Error signing in.");
    }
};

const handleGoogleLoginSuccess = (response) => {
    console.log("Google Sign In Success:", response);
    
    // Assuming the response contains the Google user data
    const { credential } = response;
    
    // Decode the JWT token to extract user info
    const userInfo = jwtDecode(credential); // You'll need to install 'jwt-decode' library to decode the JWT token
    
    // Dispatch to Redux with the actual user data from Google
    dispatch(setUser({
        userInfo: {
            name: userInfo.name,
            email: userInfo.email,
        },
        userRole: "student", // You can set this based on your application logic
    }));
    
    // Redirect to the dashboard
    navigate("/dashboard");
};
const handleForgotPassword = async () => {
    if (!email) {
      setError("Ingresá tu correo electrónico para restablecer la contraseña.");
      return;
    }
  
    try {
      const response = await axios.post(
        "https://request-password-reset-589432081267.us-central1.run.app",
        { email }
      );
  
      alert("Te enviamos un enlace para restablecer tu contraseña. Revisá tu correo.");
    } catch (error) {
      console.error("Error al enviar el restablecimiento:", error);
      setError("Hubo un problema. Por favor, intentá de nuevo más tarde.");
    }
  };
  
  
  return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="signin-left">
        <h2>Iniciá Sesión</h2>
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
            <p className="forgot-password" onClick={handleForgotPassword}>
  ¿No recordás tu contraseña?
</p>
                        {error && <p className="error-message">{error}</p>} {/* ✅ Display error message */}

            <button type="submit" className="btn">Ingresar</button>
          </form>
          <p>O iniciá sesión con Google:</p>
          <GoogleLogin onSuccess={handleGoogleLoginSuccess} />
        </div>

        <div className="signin-right">
        <h3>Financiá tu educación</h3>
        <p>Accedé a planes de pago flexibles para estudiar sin preocupaciones.</p>
          <img src={signinphoto} alt="CrediEstudio" />
        </div>
      </div>

        <Footer/>
    </>
  );
};

export default SignIn;
