import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/userSlice"; // Assuming this path
import "./styles/Navbar.css"
const Navbar = () => {
  const userInfo = useSelector((state) => state.user.userInfo); // Access userInfo from Redux
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Clear user info from Redux
    localStorage.removeItem("user"); // Optional: clear localStorage if you're using it
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">CrediEstudio</Link>
      </div>
      <div className="nav-links">
        <ul>
          {/* If user is not logged in */}
          {!userInfo ? (
            <>
              <li>
                <Link to="/signin">Iniciar Sesión</Link>
              </li>
              <li>
                <Link to="/signup">Registrarse</Link>
              </li>
            </>
          ) : (
            <>
              {/* If user is logged in */}
              <li>
                <Link to="/dashboard">Mi Dashboard</Link>
              </li>
              <li>
                <Link to="/solicitud-prestamo">Solicitar Préstamo</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </li>
            </>
          )}
          {/* Common links that are always visible */}
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <Link to="/instituciones">Instituciones</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
