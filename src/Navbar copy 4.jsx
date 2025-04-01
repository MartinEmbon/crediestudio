import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/userSlice"; // Assuming this path
import "./styles/Navbar.css"
import logoCrediEstudio from "./assets/logo-white.png";



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
                <Link to="/"><img src={logoCrediEstudio} alt="" /></Link>
            </div>
            <div className="nav-links">
                <ul>


                    <li>
                        <Link to="/signin">Iniciar Sesión</Link>
                    </li>
                    <li>
                        <Link to="/signup">Registrarse</Link>
                    </li>
                    <li>
                        <Link to="/instituciones">Instituciones</Link>
                    </li>
                    <li>
                        <Link to="/para-alumnos">Alumnos</Link>
                    </li>
                    <li>
                        <Link to="/contacto">Contacto</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
