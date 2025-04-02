import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserDashboard.css";
import NavbarLoggedIn from "../NavbarLoggedUser";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { logout } from "../redux/userSlice";
import axios from "axios"; // For API requests
import Footer from "../components/Footer";

const UserDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [openFAQ, setOpenFAQ] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://contact-form-589432081267.us-central1.run.app", formData, {
                headers: { "Content-Type": "application/json" },
            });
            alert("Mensaje enviado con éxito.");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            alert("Error al enviar el mensaje. Intenta nuevamente.");
        }
    };


    useEffect(() => {
        console.log("User Info:", userInfo); // Debugging

        const fetchUserProfile = async () => {
            if (userInfo?.email) {
                try {
                    const response = await axios.get(
                        `https://list-user-profile-589432081267.us-central1.run.app?email=${userInfo.email}`
                    );
                    console.log("API Response:", response.data);

                    const userData = response.data.loanApplicationData;

                    // Update Redux state
                    dispatch(setUser({ ...userInfo, ...userData }));
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserProfile();
    }, [userInfo?.email, dispatch]);

    const onLogout = () => {
        dispatch(setUser(null));
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        navigate("/signin");
    };

    return (
        <>
            <NavbarLoggedIn onLogout={onLogout} />
            <div className="dashboard-container">
                <h1>Bienvenido a CrediEstudio</h1>

                {/* Cómo funciona */}
                <div className="como-funciona-dashboard">
                    <h2>¿Cómo funciona?</h2>
                    <ol>
                        <li>
                            <i className="fas fa-1"></i> Completá tu perfil con tus datos. Esto es muy importante porque tener la mayor cantidad de información actualizada te sumará puntos al momento de solicitar tu crédito.
                        </li>
                        <li>
                            <i className="fas fa-2"></i> Completá el formulario de solicitud, especificando el curso o institución en la que querés inscribirte. Es importante saber que los créditos tienen un período de análisis de 24 a 48 horas hábiles.
                        </li>
                        <li>
                            <i className="fas fa-3"></i> Te contactaremos con el resultado. Si tu solicitud es aprobada, recibirás el contrato para firmar digitalmente y tu calendario de pagos.
                        </li>
                    </ol>
                </div>

                <p className="dash-pick-card">Elegí una opción para continuar:</p>

                <div className="cards-container">
                    <div className="dashboard-card" onClick={() => navigate("/perfil-usuario")}>
                        <i className="fas fa-user fa-3x card-icon"></i>
                        <h3>Mi Perfil</h3>
                        <p>Mantené tus datos actualizados.</p>
                    </div>

                    <div className="dashboard-card" onClick={() => navigate("/solicitud-prestamo")}>
                        <i className="fas fa-money-bill-wave fa-3x card-icon"></i>
                        <h3>Solicitar Préstamo</h3>
                        <p>Accedé a financiamiento para tu educación con solo unos clics.</p>
                    </div>

                    <div className="dashboard-card" onClick={() => navigate("/mis-prestamos")}>
                        <i className="fas fa-list-alt fa-3x card-icon"></i>
                        <h3>Ver Préstamos Actuales</h3>
                        <p>Consultá el estado de tus préstamos en curso y su información.</p>
                    </div>
                </div>

                <div className="faq-section">
                    <h2>Preguntas Frecuentes</h2>
                    {[
                        { question: "¿Cuánto tiempo tarda la aprobación del préstamo?", answer: "El tiempo de aprobación varía, pero suele tomar entre 3 y 5 días hábiles." },
                        { question: "¿Qué documentación necesito presentar?", answer: "Deberás presentar tu DNI, comprobante de inscripción y datos bancarios." },
                        { question: "¿Cómo se realiza el pago del préstamo?", answer: "Podés pagar en cuotas mensuales a través de débito automático o transferencia bancaria." },
                    ].map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button className="faq-question" onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
                                {faq.question} <span>{openFAQ === index ? "−" : "+"}</span>
                            </button>
                            <div className={`faq-answer ${openFAQ === index ? "open" : ""}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Formulario de Contacto */}
                <div className="para-alunos-form">
                    <h2>¿Dudas?</h2>
                    <p>¡Nuestro equipo está listo para ayudarte!</p>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre:</label>
                        <input type="text" name="name" placeholder="Tu nombre" value={formData.name} onChange={handleChange} required />
                        <label>Correo Electrónico:</label>
                        <input type="email" name="email" placeholder="Tu e-mail" value={formData.email} onChange={handleChange} required />
                        <label>Mensaje:</label>
                        <textarea name="message" placeholder="Contanos cómo podemos ayudarte" value={formData.message} onChange={handleChange} required />
                        <button type="submit" className="btn">Enviar Solicitud</button>
                    </form>
                </div>


            </div>
           <Footer/>
        </>
    );
};

export default UserDashboard;
