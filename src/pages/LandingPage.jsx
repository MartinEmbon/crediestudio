import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import Navbar from "../Navbar"; // Public Navbar

const LandingPage = () => {
    return (
      <>
        <Navbar />
        <div>
          <h1>Bienvenido a CrediEstudio</h1>
          <p>Tu plataforma de financiamiento educativo</p>
        </div>
      </>
    );
  };
  
  export default LandingPage;

// const LandingPage = () => {
//   return (
//     <div className="landing-container">
//       <div className="landing-left">
//         <h1>Bienvenido a CrediEstudio</h1>
//         <p>
//           Financia tu educación de manera sencilla y rápida. Descubre planes
//           flexibles y accesibles para cumplir tus sueños académicos.
//         </p>
//       </div>

//       <div className="landing-right">
//         <h2>Accede a tu cuenta</h2>
//         <Link to="/signup" className="btn">Registrarse</Link>
//         <Link to="/signin" className="btn btn-secondary">Iniciar Sesión</Link>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
