import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavbarLoggedUser.css"
import { useSelector } from "react-redux";
const NavbarLoggedIn = ({ onLogout }) => {

    // const userInfo = useSelector((state) => state.user.userInfo);

    const userData = useSelector((state) => state.user.userInfo);
    const userInfo = userData?.userInfo;


    console.log("Navbar userInfo:", userInfo);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/dashboard" className="nav-logo">
                {userInfo?.name ? `Hola ${userInfo.name.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}` : "Mi Plataforma"}
                </Link>        <ul className="nav-menu">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    {/* <li><Link to="/solicitud-prestamo">Request Loan</Link></li>
          <li><Link to="/mis-prestamos">My Loans</Link></li> */}
                    {/* <li><Link to="/perfil-usuario">Mi Perfil</Link></li> */}

                    <li><button onClick={onLogout} className="logout-btn">Salir</button></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarLoggedIn;
