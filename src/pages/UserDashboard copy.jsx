import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "../styles/UserDashboard.css";
import NavbarLoggedIn from "../NavbarLoggedUser";
import { useDispatch, useSelector  } from "react-redux";
import { setUser  } from "../redux/userSlice"; // Make sure this import is correct
import { logout } from '../redux/userSlice'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const userRole = useSelector((state) => state.user.userRole);

  // Check if it's the user's first login by a flag like isProfileComplete
  const isFirstLogin = !userInfo?.isProfileComplete;


  const onLogout = () => {
    // Clear the user info from Redux
    dispatch(setUser(null));
  
    // Optionally clear authentication token from localStorage or sessionStorage
    localStorage.removeItem("authToken");  // If you are storing a token in localStorage
    sessionStorage.removeItem("authToken"); // If you are storing a token in sessionStorage
  
    // Redirect to the login page
    navigate("/signin");
  };

  useEffect(() => {
    if (isFirstLogin) {
      toast.info("¡Es importante completar tu perfil primero para acceder a todas las opciones!", {
        position: "top-right",
        autoClose: 5000, // Show for 5 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isFirstLogin]);

  return (
    <>
    <NavbarLoggedIn onLogout={onLogout}/>
    
    <div className="dashboard-container">
      <h1>Bienvenido a CrediEstudio</h1>
      <p>Elige una opción para continuar:</p>

      <div className="cards-container">
        {/* Request Loan Card */}
        <div className="dashboard-card" onClick={() => navigate("/solicitud-prestamo")}>
          {/* <img src="/assets/request-loan.jpg" alt="Solicitar Préstamo" /> */}
          <i className="fas fa-money-bill-wave fa-3x card-icon"></i> {/* Request Loan Icon */}

          <h3>Solicitar Préstamo</h3>
          <p>Accede a financiamiento para tu educación con solo unos clics.</p>
        </div>

        {/* View Current Loans Card */}
        <div className="dashboard-card" onClick={() => navigate("/mis-prestamos")}>
          {/* <img src="/assets/current-loans.jpg" alt="Ver Préstamos Actuales" /> */}
          <i className="fas fa-list-alt fa-3x card-icon"></i> {/* Current Loans Icon */}

          <h3>Ver Préstamos Actuales</h3>
          <p>Consulta el estado de tus préstamos en curso y su información.</p>
        </div>

         {/* View Profile*/}
         <div className="dashboard-card" onClick={() => navigate("/perfil-usuario")}>
          {/* <img src="/assets/current-loans.jpg" alt="Ver Préstamos Actuales" /> */}
          <i className="fas fa-user fa-3x card-icon"></i> {/* Profile Icon */}

          <h3>Mi Perfil</h3>
          <p>Mantené tus datos actualizados.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserDashboard;
