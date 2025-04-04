import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLoggedAdmin from "../NavbarLoggedAdmin";
import "../styles/ApplicationsPage.css";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import axios from "axios";

const AdminApplications = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch applications from Cloud Function
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get("https://get-loan-applications-admin-589432081267.us-central1.run.app");
                setApplications(response.data.applications);
                console.log("hey", response)
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, []);

    const onLogout = () => {
        dispatch(setUser(null));
        localStorage.clear();
        navigate("/admin-login");
    };

    // Filter applications based on search input
    const filteredApplications = applications.filter((app) =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <NavbarLoggedAdmin onLogout={onLogout} />
            <div className="applications-container">
                <h2>Solicitudes de Estudiantes</h2>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Buscar por nombre o curso..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />

                {/* Table */}
                <div className="table-wrapper">
                    <table className="applications-table">
                        <thead>
                            <tr>
                                {/* <th>RequestId</th> */}
                                <th>Nombre</th>
                                <th>Curso</th>
                                <th>Institución</th>

                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Revisión</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map((app, index) => (
                                    <tr key={index}>
                                        {/* <td>{app.requestId}</td> */}
                                        <td>{app.fullName}</td>
                                        <td>{app.course}</td>
                                        <td>{app.institution}</td>
                                        <td>{app.date}</td>
                                        <td>{app.status}</td>
                                        <td>
                                            <button
                                                className="review-button"
                                                onClick={() => navigate(`/admin`, { state: { 
                                                    cuit: app.cuit, dni: app.dni, dateOfBirth: app.dateOfBirth, reason: app.reason, requestedAmount: app.requestedAmount, institution: app.institution,
                                                    requestId: app.requestId, studentName: app.fullName, studentEmail: app.email, courseName: app.course } })}
                                            >
                                                Más detalles
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No se encontraron resultados</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
{/* 
                <button className="back-to-institution-dash" onClick={() => navigate(-1)}>
                    Volver
                </button> */}
            </div>
        </>
    );
};

export default AdminApplications;
