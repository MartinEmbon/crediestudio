import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavbarLoggedUser.css"
import { useSelector } from "react-redux";
import logoCrediEstudio from "./assets/logo-white.png";



const NavbarLoggedAdmin = ({ onLogout }) => {

  // const userInfo = useSelector((state) => state.user.userInfo);

  const userData = useSelector((state) => state.user.userInfo);
  const userInfo = userData?.userInfo;


  console.log("Navbar userInfo:", userInfo);

  return (
    <nav>
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
        <Link to="/admin">
          <img src={logoCrediEstudio} alt="CrediEstudio Logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <ul>
          
            <li><Link to="/admin-applications">Solicitudes</Link></li>
            {/* <li><Link to="/admin">Dashboard</Link></li> */}
          </ul>
        </div>

        {/* Greeting & Logout Button */}
        <div className="auth-buttons">
          <span className="nav-greeting">
            {userInfo?.name
              ? `Hola ${userInfo.name.charAt(0).toUpperCase()}${userInfo.name.slice(1).toLowerCase()}`
              : "Mi Plataforma"}
          </span>
          <button onClick={onLogout} className="btn btn-outline">Salir</button>
        </div>
      </div>
    </nav>
  );


};

export default NavbarLoggedAdmin;
