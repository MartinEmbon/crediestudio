import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { requestLoan } from "../api/loanAPI";
// import institutionsData from "../data/institutions.json";
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
  const userData = useSelector((state) => state.user.userInfo);
    const userInfo = userData?.userInfo;


    console.log("Req:", userInfo);
  const [formData, setFormData] = useState({
    fullName: "",
    email:userInfo.email,
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
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [courses, setCourses] = useState([]);
  const [institutions, setInstitutions] = useState([]);

//   useEffect(() => {
//     const selectedInstitution = institutionsData.find(
//       (inst) => inst.name === formData.institution
//     );
//     setCourses(selectedInstitution ? selectedInstitution.courses : []);
//     setFormData((prev) => ({ ...prev, course: "" }));
//   }, [formData.institution]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 // Fetch institutions and courses from Firestore
 useEffect(() => {
    const fetchInstitutionsAndCourses = async () => {
      try {
        const response = await axios.get("https://list-institution-and-couses-for-loan-589432081267.us-central1.run.app");
        setInstitutions(response.data.institutions); // Store institutions and their courses
      } catch (error) {
        console.error("Error fetching institutions and courses:", error);
      }
    };

    fetchInstitutionsAndCourses();
  }, []);

  // Update courses when an institution is selected
  useEffect(() => {
    const selectedInstitution = institutions.find(
      (inst) => inst.institutionName === formData.institution
    );
    setCourses(selectedInstitution ? selectedInstitution.courses : []);
    setFormData((prev) => ({ ...prev, course: "" })); // Reset course when institution changes
  }, [formData.institution, institutions]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmissionStatus("");

    try {
        const response = await axios.post(
          "https://loan-contact-form-589432081267.us-central1.run.app", // Replace with your actual API
          formData,
          { headers: { "Content-Type": "application/json" } }
        );
  
        if (response.data.status === "Error") {
          setError(response.data.message);
        } else {
          setSubmissionStatus("Tu solicitud está en proceso de aprobación. Te contactaremos en las próximas 24 hs.");
          
        //   // Send confirmation email
        //   await axios.post("https://your-cloud-function-url/sendEmail", {
        //     to: formData.email,
        //     subject: "Solicitud de crédito en proceso",
        //     message: `Hola ${formData.fullName},\n\nTu solicitud de crédito está bajo revisión. Nos pondremos en contacto contigo en las próximas 24 horas.\n\nGracias.`
        //   });
        }
      } catch (error) {
        console.error("Error en la solicitud de préstamo:", error);
        setError("Hubo un error al procesar la solicitud. Intenta nuevamente.");
      }
      setLoading(false);
    };

  return (
    <>
      <NavbarLoggedIn onLogout={onLogout} />
      <div className="loan-container">
        <header className="loan-header">
          <h1>Solicitá tu Crédito Educativo</h1>
        </header>
        <main className="loan-main">
          <h2>Completá el formulario para solicitar su crédito educativo</h2>
          <form onSubmit={handleSubmit} className="loan-form">
            <label>
              Nombre Completo:
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </label>

            <label>
              DNI:
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
            {institutions.map((inst) => (
              <option key={inst.institutionName} value={inst.institutionName}>
                {inst.institutionName}
              </option>
            ))}
              </select>
            </label>

            <label>
          Curso:
          <select name="course" value={formData.course} onChange={handleChange} required disabled={!formData.institution}>
            <option value="">Seleccione un curso</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}> {/* Use course.id as the value */}
                {course.name} {/* Display course.name */}
              </option>
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

            <button type="submit" className="request-credit" disabled={loading}>{loading ? "Procesando..." : "Solicitar Crédito"}</button>
            {error && <p className="loan-error">{error}</p>}
          </form>

          {error && <p className="loan-error">{error}</p>}
          {submissionStatus && <p className="loan-success">{submissionStatus}</p>}
        </main>

        <button className="loan-form button back-button back-to-dash-loan" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
       {/* Footer */}
       <footer className="home-footer">
        <div className="home-footer-text">
          <p>&copy; 2025 Educacion Plus | Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default LoanRequest;
