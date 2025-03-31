import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavbarLoggedUser.css"

const NavbarLoggedInstitution = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard-institution" className="nav-logo">Institutuciones</Link>
        <ul className="nav-menu">
          <li><Link to="/dashboard-institution">Dashboard</Link></li>
          <li><Link to="/applications">Aplications</Link></li>
   

          <li><button onClick={onLogout} className="logout-btn">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarLoggedInstitution;
