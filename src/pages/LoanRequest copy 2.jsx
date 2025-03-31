import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { requestLoan } from "../api/loanAPI";
import institutionsData from "../data/institutions.json";
import "../styles/LoanRequest.css";
import NavbarLoggedIn from "../NavbarLoggedUser";
import axios from 'axios';

const LoanRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(setUser(null));
    navigate("/signin");
  };

  const [formData, setFormData] = useState({
    fullName: "",
    dni: "",
    cuit: "", // Nuevo campo CUIT/CUIL/CDI
    dateOfBirth: "",
    requestedAmount: "",
    paymentPlan: "",
    reason: "",
    institution: "",
    course: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const selectedInstitution = institutionsData.find(
      (inst) => inst.name === formData.institution
    );
    setCourses(selectedInstitution ? selectedInstitution.courses : []);
    setFormData((prev) => ({ ...prev, course: "" }));
  }, [formData.institution]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const isValidCuit = (cuit) => {
    // Check if the cuit is exactly 11 digits long and contains only numbers
    return /^\d{11}$/.test(cuit);
  };
  
  const checkDebtSituation = async (cuit) => {
    if (!isValidCuit(cuit)) {
      console.error("Invalid CUIT format. It should be 11 digits.");
      return false; // Return false if cuit is not valid
    }
  
    try {
      const response = await axios.get(`https://api.bcra.gob.ar/CentralDeDeudores/v1.0/Deudas/${cuit}`);
      
      // If the response status is 404, no debt is found
      if (response.status === 404) {
        return false; // No debt found, return false
      }
  
      const data = response.data;
  
      if (!data.results || !data.results.periodos || data.results.periodos.length === 0) {
        return false; // No periodos or results, return false
      }
  
      const lastPeriod = data.results.periodos[0];
      const worstSituation = Math.max(
        ...lastPeriod.entidades.map((ent) => ent.situacion)
      );
  
      return worstSituation > 1; // If the worst situation is greater than 1, return true
    } catch (error) {
      // If the error is a 404 or any other error, handle gracefully
      if (error.response && error.response.status === 404) {
        return false; // No debt found (404), return false
      }
      console.error("Error while checking debt situation:", error);
      return false; // Return false for other errors
    }
  };
  
  const checkHistoricalDebt = async (cuit) => {
    if (!isValidCuit(cuit)) {
      console.error("Invalid CUIT format. It should be 11 digits.");
      return false; // Return false if cuit is not valid
    }
  
    try {
      const response = await axios.get(`https://api.bcra.gob.ar/CentralDeDeudores/v1.0/Deudas/Historicas/${cuit}`);
      const data = response.data;
  
      if (!data.results || !data.results.periodos || data.results.periodos.length === 0) {
        return false; // No periodos, return false
      }
  
      const worstSituation = Math.max(
        ...data.results.periodos.flatMap((periodo) =>
          periodo.entidades.map((ent) => ent.situacion)
        )
      );
  
      return worstSituation > 1; // If the worst situation is greater than 1, return true
    } catch (error) {
      console.error("Error while checking historical debt:", error);
      return false;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isDebtOk = await checkDebtSituation(formData.cuit);
    const isHistoricalDebtOk = await checkHistoricalDebt(formData.cuit);

    if (!isDebtOk || !isHistoricalDebtOk) {
      setError("Lo sentimos. No es posible otorgar el crédito debido a su situación crediticia.");
      setLoading(false);
      return;
    }

    const response = await requestLoan(formData);

    if (response.status === "Error") {
      setError(response.message);
      setLoading(false);
    } else {
      dispatch(setUser(response));
      navigate("/confirmacion-prestamo");
    }
  };

  return (
    <>
      <NavbarLoggedIn onLogout={onLogout} />
      <div className="loan-container">
        <header className="loan-header">
          <h1>Solicita tu Crédito Educativo</h1>
        </header>
        <main className="loan-main">
          <h2>Complete el formulario para solicitar su crédito educativo</h2>
          <form onSubmit={handleSubmit} className="loan-form">
            <label>
              Nombre Completo:
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </label>

            <label>
              DNI / Número de Identificación:
              <input type="text" name="dni" value={formData.dni} onChange={handleChange} required />
            </label>

            <label>
              CUIT / CUIL / CDI:
              <input type="text" name="cuit" value={formData.cuit} onChange={handleChange} required />
            </label>

            <label>
              Fecha de Nacimiento:
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            </label>

            <label>
              Institución:
              <select name="institution" value={formData.institution} onChange={handleChange} required>
                <option value="">Seleccione una institución</option>
                {institutionsData.map((inst) => (
                  <option key={inst.name} value={inst.name}>{inst.name}</option>
                ))}
              </select>
            </label>

            <label>
              Curso:
              <select name="course" value={formData.course} onChange={handleChange} required disabled={!formData.institution}>
                <option value="">Seleccione un curso</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </label>

            <label>
              Monto Solicitado:
              <input type="number" name="requestedAmount" value={formData.requestedAmount} onChange={handleChange} required />
            </label>

            <label>
              Plan de Pago (en cuotas):
              <input type="number" name="paymentPlan" value={formData.paymentPlan} onChange={handleChange} required />
            </label>

            <label className="additional-comments">
              Comentarios adicionales:
              <textarea name="reason" value={formData.reason} onChange={handleChange} required />
            </label>

            <button type="submit" disabled={loading}>{loading ? "Procesando..." : "Solicitar Crédito"}</button>
            {error && <p className="loan-error">{error}</p>}
          </form>
        </main>

        <button className="loan-form button back-button" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </>
  );
};

export default LoanRequest;
