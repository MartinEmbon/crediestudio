import React, { useState } from "react";
import Navbar from "../Navbar";
import "../styles/SignUp.css"; // Asegúrate de que tu CSS esté bien configurado
import signinphoto from "../assets/signin.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


const SignUp = () => {
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState("");
    const [studentName, setStudentName] = useState("");
    const [password, setPassword] = useState("");

    
    const [institutionDetails, setInstitutionDetails] = useState({
        institutionName: "",
        contactInstitutionEmail: "",
        institutionPassword: ""
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate("")

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Ensure role is always 'student'
        const userData = {
            email,
            password,
            isProfileComplete:false,
            role: "student", // Default role
            studentName, // Ensure studentName is included
        };

        try {
            const response = await axios.post(
                "https://register-user-589432081267.us-central1.run.app",
                userData
            );
            setSuccessMessage(response.data.message);
            setEmail("")
            setPassword("")
            setStudentName("")
            setError(""); // Reset any error messages
            setTimeout(() => navigate("/signin"), 2000);

        } catch (error) {
            setError(error.response?.data || "An error occurred while registering.");
            setSuccessMessage(""); // Reset any success messages
        }
    };

    const handleInstitutionContact = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://register-institution-589432081267.us-central1.run.app", institutionDetails);
            console.log("Institution registered successfully:", response.data);
            alert("Gracias por contactarnos. Nos comunicaremos pronto.");
            // Optionally reset the form
            setInstitutionDetails({ institutionName: "", contactInstitutionEmail: "", institutionPassword: "" });
            setRole(null);
            setTimeout(() => navigate("/signin"), 2000);

        } catch (error) {
            console.error("Error registering institution:", error);
            alert("Hubo un error al enviar la consulta. Inténtelo de nuevo.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="signup-container">
                {/* Left Side - Registration Form */}
                <div className="signup-left">
                    {/* Condicionar el título según el rol */}
                    {role === "institution" ? (
                        <>
                            <h2>Formulario de Contacto para Instituciones</h2>
                            <p>Por favor, completá el formulario para que uno de nuestros asesores se ponga en contacto con vos.</p>
                            </>
                    ) : (
                        <>
            <h2>Registrate en CrediEstudio</h2>
            <p>Unite y accedé a financiamiento educativo.</p>
                        </>
                    )}

                    {/* Step 1: Select Role */}
                    {!role ? (
                        <div className="role-selection">
            <h3>¿Qué tipo de usuario sos?</h3>
            <button onClick={() => setRole("student")} className="btn">
                                Soy Estudiante
                            </button>
                            <button onClick={() => setRole("institution")} className="btn">
                                Soy Institución
                            </button>
                        </div>
                    ) : (
                        /* Step 2: Form Based on Role */
                        role === "institution" ? (
                            // Formulario de contacto para instituciones
                            <form onSubmit={handleInstitutionContact} className="contact-form">
                                <input
                                    type="text"
                                    placeholder="Nombre de la Institución"
                                    value={institutionDetails.institutionName}
                                    onChange={(e) => setInstitutionDetails({ ...institutionDetails, institutionName: e.target.value })}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Correo electrónico de contacto"
                                    value={institutionDetails.contactInstitutionEmail}
                                    onChange={(e) => setInstitutionDetails({ ...institutionDetails, contactInstitutionEmail: e.target.value })}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={institutionDetails.institutionPassword}
                                    onChange={(e) => setInstitutionDetails({ ...institutionDetails, institutionPassword: e.target.value })}
                                    required
                                />
                                <button type="submit" className="btn">
                                    Crear Cuenta
                                </button>
                                {/* Back Button to Step 1 */}
                                <button
                                    type="button"
                                    onClick={() => setRole(null)}
                                    className="btn back-btn"
                                    style={{ marginTop: "10px", backgroundColor: "#ccc", color: "#000" }}
                                >
                                    Volver a seleccionar tipo de usuario
                                </button>
                            </form>
                        ) : (
                            /* Step 2: Show Registration Form for Students */
                            <form onSubmit={handleSignUp} className="signup-form">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn">
                                    Crear Cuenta
                                </button>
                                {/* Back Button to Step 1 */}
                                <button
                                    type="button back-btn-landing"
                                    onClick={() => setRole(null)}
                                    className="btn back-btn"
                                    // style={{ marginTop: "10px", backgroundColor: "#ccc", color: "#000" }}
                                >
                                    Volver a seleccionar tipo de usuario
                                </button>
                            </form>
                        )
                    )}

                </div>
                {/* Right Side - Image or Content */}
                <div className="signup-right">
                <h3>Financiá tu futuro</h3>
                <p>Descubrí cómo nuestros créditos educativos pueden ayudarte.</p>
                    <img src={signinphoto} alt="CrediEstudio" />
                </div>
                {/* Display error or success messages */}
                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
            </div>

          <Footer/>
        </>

    );
};

export default SignUp;
