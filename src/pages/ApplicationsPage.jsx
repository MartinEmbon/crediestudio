import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLoggedIn from "../NavbarLoggedUser";
import "../styles/ApplicationsPage.css"; // Create a CSS file for styling
import NavbarLoggedInstitution from "../NavbarLoggedInstitution";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
const ApplicationsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // Mock data for applicants
    const [applicants, setApplicants] = useState([
        { id: 1, name: "Juan Pérez", course: "Curso de Programación Web", date: "2024-03-15", approved: "Si" },
        { id: 2, name: "Ana Gómez", course: "Gestión Empresarial", date: "2024-04-02", approved: "Si" },
        { id: 3, name: "Carlos Rodríguez", course: "Finanzas para Emprendedores", date: "2024-05-20", approved: "Si" },
    ]);

    const onLogout = () => {
        dispatch(setUser(null)); // Clear user info from Redux
        navigate("/signin"); // Redirect to login page
    };

    // Search filter state
    const [searchTerm, setSearchTerm] = useState("");

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filtered applicants based on search input
    const filteredApplicants = applicants.filter((applicant) =>
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <NavbarLoggedInstitution onLogout={onLogout} />
            <div className="applications-container">
                <h2>Solicitudes de Estudiantes</h2>
    
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Buscar por nombre o curso..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
    
                {/* Responsive Table Wrapper */}
                <div className="table-wrapper">
                    <table className="applications-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Curso</th>
                                <th>Fecha</th>
                                <th>Aprobado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplicants.length > 0 ? (
                                filteredApplicants.map((applicant) => (
                                    <tr key={applicant.id}>
                                        <td>{applicant.name}</td>
                                        <td>{applicant.course}</td>
                                        <td>{applicant.date}</td>
                                        <td>{applicant.approved}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No se encontraron resultados</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
    
                <button className="back-to-institution-dash" onClick={() => navigate(-1)}>
                    Volver
                </button>
            </div>
        </>
    );
    
};

export default ApplicationsPage;
