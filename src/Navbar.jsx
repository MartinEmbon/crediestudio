import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/userSlice"; // Assuming this path
import "./styles/Navbar.css"
import logoCrediEstudio from "./assets/logo-white.png";

const Navbar = () => {
    const userInfo = useSelector((state) => state.user.userInfo); // Access userInfo from Redux
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout()); // Clear user info from Redux
        localStorage.removeItem("user"); // Optional: clear localStorage if you're using it
    };
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav>
            <div className="logo">
                <Link to="/">
                    <img src={logoCrediEstudio} alt="CrediEstudio Logo" />
                </Link>
            </div>

            {/* Burger Menu Icon */}
            <div className={`burger-menu ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
            </div>

            {/* Nav Links */}
            <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                <ul>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/instituciones" onClick={toggleMenu}>Instituciones</Link></li>
                <li><Link to="/para-alumnos" onClick={toggleMenu}>Alumnos</Link></li>
                    <li><Link to="/signin" onClick={toggleMenu}>Iniciar Sesión</Link></li>
                    <li><Link to="/signup" onClick={toggleMenu}>Registrarse</Link></li>
                    {/* <li><Link to="/admin-login" onClick={toggleMenu}>Admin</Link></li> */}

                    <li><Link to="/contacto" onClick={toggleMenu}>Contacto</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
