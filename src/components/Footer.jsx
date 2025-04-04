import React from "react";
import "../styles/Footer.css"; // Ensure you have styles for the footer

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="home-footer-text">
        <p>&copy; 2025 Educacion Plus | Todos los derechos reservados.</p>
      </div>

      <div className="whatsapp-button">
          <a
            target="_blank"
            href="https://wa.me/5493795003578"
            className="whatsapp-link"
            rel="noreferrer"
          >
            <i className="fab fa-whatsapp"></i> 
          </a>
        </div>
    </footer>
  );
};

export default Footer;
