import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice"; // Aquí vamos a manejar el estado del usuario

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    // Aquí manejarías el token o los datos de respuesta de Google
    const user = response?.credential;  // Datos del usuario
    dispatch(setUser(user));  // Almacenamos el usuario en el estado global (Redux)
    navigate("/course-summary"); // Redirigir a un panel o página de usuario
    // navigate("/dashboard"); // Redirigir a un panel o página de usuario
  };

  const handleLoginFailure = (error) => {
    console.error("Login failed: ", error);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>CrediEstudio - Login</h1>
      </header>
      <main style={styles.main}>
        <h2>Inicia sesión para continuar</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          useOneTap
          theme="filled_blue"
        />
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
  },
  header: {
    marginBottom: "50px",
  },
  main: {
    marginTop: "30px",
  },
};

export default Login;
