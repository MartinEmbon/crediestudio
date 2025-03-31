import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserDashboard.css";
import NavbarLoggedIn from "../NavbarLoggedUser";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { logout } from "../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // For API requests

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    console.log("User Info:", userInfo); // Debugging

    const fetchUserProfile = async () => {
      if (userInfo?.email) {
        try {
          const response = await axios.get(
            `https://list-user-profile-589432081267.us-central1.run.app?email=${userInfo.email}`
          );
          console.log("API Response:", response.data);

          const userData = response.data.loanApplicationData;
          setIsProfileComplete(userData.isProfileComplete);

          // Update Redux state
          dispatch(setUser({ ...userInfo, isProfileComplete: userData.isProfileComplete }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserProfile();
  }, [userInfo?.email, dispatch]);

  useEffect(() => {
    if (!isProfileComplete) {
      toast.info("¡Es importante completar tu perfil primero para acceder a todas las opciones!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [isProfileComplete]);

  const onLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/signin");
  };

  return (
    <>
      <NavbarLoggedIn onLogout={onLogout} />
      <div className="dashboard-container">
        <h1>Bienvenido a CrediEstudio</h1>
        <p>Elige una opción para continuar:</p>

        {!isProfileComplete && (
          <div className="first-login-message">
            <p>
              ¡Bienvenido! Antes de acceder a otras funcionalidades, es obligatorio completar tu perfil.
            </p>
          </div>
        )}

        <div className="cards-container">
          <div className="dashboard-card" onClick={() => navigate("/perfil-usuario")}>
            <i className="fas fa-user fa-3x card-icon"></i>
            <h3>Mi Perfil</h3>
            <p>Mantené tus datos actualizados.</p>
          </div>

          <div className={`dashboard-card ${!isProfileComplete ? "disabled-card" : ""}`} onClick={() => isProfileComplete && navigate("/solicitud-prestamo")}>
            <i className="fas fa-money-bill-wave fa-3x card-icon"></i>
            <h3>Solicitar Préstamo</h3>
            <p>Accede a financiamiento para tu educación con solo unos clics.</p>
          </div>

          <div className={`dashboard-card ${!isProfileComplete ? "disabled-card" : ""}`} onClick={() => isProfileComplete && navigate("/mis-prestamos")}>
            <i className="fas fa-list-alt fa-3x card-icon"></i>
            <h3>Ver Préstamos Actuales</h3>
            <p>Consulta el estado de tus préstamos en curso y su información.</p>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default UserDashboard;
