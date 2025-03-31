import {React,useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./redux/userSlice"; // Import the logout action from userSlice
import "./styles/navbar.css";

const Navbar = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Ensure gapi is only loaded once
        const loadGapi = () => {
          window.gapi.load("auth2", () => {
            window.gapi.auth2
              .init({
                client_id: "867228903962-3rs922ieqcl8ttpaa8glcl0r0so4d6ps.apps.googleusercontent.com", // Replace with your client ID
              })
              .then(() => console.log("Google Auth initialized"))
              .catch((error) => console.error("Google Auth init error:", error));
          });
        };
    
        if (!window.gapi) {
          // Load Google API script dynamically
          const script = document.createElement("script");
          script.src = "https://apis.google.com/js/api.js";
          script.async = true;
          script.defer = true;
          script.onload = loadGapi;
          document.body.appendChild(script);
    
          return () => {
            document.body.removeChild(script);
          };
        } else {
          loadGapi();
        }
      }, []);
    
      // ✅ **2️⃣ Fix handleLogout Function**
      const handleLogout = () => {
        const authInstance = window.gapi?.auth2?.getAuthInstance();
        if (authInstance) {
          authInstance
            .signOut()
            .then(() => {
              console.log("User signed out");
              dispatch(logout()); // Clear user state in Redux
            })
            .catch((error) => console.error("Google Sign Out Error:", error));
        } else {
          console.error("Google Auth instance is not initialized.");
        }
      };
    
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Principal</Link>
        </li>
        {/* <li>
          <Link to="/login">Login</Link>
        </li> */}
        {/* <li>
          <Link to="/course-summary">Course Summary</Link>
        </li> */}
        <li>
          <Link to="/solicitud-prestamo">Solicitud Prestamo</Link>
        </li>
        {/* <li>
          <Link to="/loan-confirmation">Loan Confirmation</Link>
        </li> */}
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          {/* Logout Button */}
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

// Styles for the logout button
const styles = {
  logoutButton: {
    backgroundColor: "#f44336",  // Red color to indicate logout
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Navbar;
