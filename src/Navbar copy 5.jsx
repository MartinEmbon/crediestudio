import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/userSlice"; // Assuming this path
import "./styles/Navbar.css";
import logoCrediEstudio from "./assets/logo-white.png";

const Navbar = () => {
    const userInfo = useSelector((state) => state.user.userInfo); // Access userInfo from Redux
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility

    const handleLogout = () => {
        dispatch(logout()); // Clear user info from Redux
        localStorage.removeItem("user"); // Optional: clear localStorage if you're using it
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle menu visibility
    };

    return (
        <nav>
            <div className="logo">
                <Link to="/"><img src={logoCrediEstudio} alt="Logo" /></Link>
            </div>
            <div className={`nav-links ${menuOpen ? "active" : ""}`}>
                <ul>
                    <li><Link to="/signin">Iniciar Sesión</Link></li>
                    <li><Link to="/signup">Registrarse</Link></li>
                    <li><Link to="/instituciones">Instituciones</Link></li>
                    <li><Link to="/para-alumnos">Alumnos</Link></li>
                    <li><Link to="/contacto">Contacto</Link></li>
                </ul>
            </div>
            <div className="burger-menu" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default Navbar;
