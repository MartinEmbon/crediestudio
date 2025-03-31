import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { requestLoan } from "../api/loanAPI";
import institutionsData from "../data/institutions.json";
import "../styles/LoanRequest.css";
import NavbarLoggedIn from "../NavbarLoggedUser";



const LoanRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(setUser (null)); // Clear user info from Redux
    navigate("/signin"); // Redirect to login page
  };


  const [formData, setFormData] = useState({
    fullName: "",
    dni: "", // DNI field for identification
    dateOfBirth: "", // Date of birth for identification
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
    // Update courses when an institution is selected
    const selectedInstitution = institutionsData.find(
      (inst) => inst.name === formData.institution
    );
    setCourses(selectedInstitution ? selectedInstitution.courses : []);
    setFormData((prev) => ({ ...prev, course: "" })); // Reset course selection
  }, [formData.institution]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Send formData including personal data for the Veraz check
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
    <NavbarLoggedIn onLogout={onLogout}/>
    
    <div className="loan-container">
      <header className="loan-header">
        <h1>Solicita tu Crédito Educativo</h1>
      </header>
      <main className="loan-main">
        <h2>Complete el formulario para solicitar su crédito educativo</h2>
        <form onSubmit={handleSubmit} className="loan-form">
          <label>
            Nombre Completo:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            DNI / Número de Identificación:
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Fecha de Nacimiento:
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Institución:
            <select
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una institución</option>
              {institutionsData.map((inst) => (
                <option key={inst.name} value={inst.name}>
                  {inst.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Curso:
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              disabled={!formData.institution}
            >
              <option value="">Seleccione un curso</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </label>

          <label>
            Monto Solicitado:
            <input
              type="number"
              name="requestedAmount"
              value={formData.requestedAmount}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Plan de Pago (en cuotas):
            <input
              type="number"
              name="paymentPlan"
              value={formData.paymentPlan}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Dejanos otr:
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Procesando..." : "Solicitar Crédito"}
          </button>
          {error && <p className="loan-error">{error}</p>}
        </form>

        <button className="loan-form button back-button" onClick={() => navigate(-1)}>
          Volver
        </button>
      </main>
    </div>
    </>
  );
};

export default LoanRequest;
