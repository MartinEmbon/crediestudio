import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../redux/userSlice"; // Importamos logout también
import { Link } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo); // Obtenemos el usuario de Redux

  const handleLoginSuccess = (response) => {
    const user = response?.credential;  
    dispatch(setUser(user));  
    navigate("/dashboard"); 
  };

  const handleLogout = () => {
    dispatch(logout());  
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1>CrediEstudio</h1>
        <h2>Financia tu educación de forma fácil y rápida</h2>
        <p>Accede a planes de financiamiento para tu educación con procesos rápidos y sin complicaciones.</p>
      </div>

      <div style={styles.right}>
        <h2>Accede a tu cuenta</h2>
        {user ? (
          <>
            <p>Ya has iniciado sesión.</p>
            <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
          </>
        ) : (
          <GoogleLogin onSuccess={handleLoginSuccess} useOneTap theme="filled_blue" />
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  left: {
    width: "50%",
    padding: "20px",
  },
  right: {
    width: "50%",
    textAlign: "center",
    padding: "20px",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default LandingPage;
