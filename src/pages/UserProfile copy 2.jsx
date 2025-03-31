import {React, useState, useEffect} from "react";
import "../styles/UserProfile.css";
import NavbarLoggedIn from "../NavbarLoggedUser";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import axios from "axios"

const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    // Rehydrate user info from localStorage if not present in Redux state
    const userInfo = {
      name: localStorage.getItem("userName") || "Usuario Desconocido",
      email: localStorage.getItem("userEmail") || "No disponible",
    };
    if (userInfo.name && userInfo.email) {
      dispatch(setUser(userInfo));
    }
  }, [dispatch]);


// ✅ Get user data from Redux
const user = useSelector((state) => state.user.userInfo);

// ✅ Fallback: If Redux state is lost, fetch from localStorage
const storedUser = {
  name: user?.name || localStorage.getItem("userName") || "Usuario Desconocido",
  email: user?.email || localStorage.getItem("userEmail") || "No disponible",
};

console.log(storedUser)

// ✅ Loan Form State
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [lastAcademicTitle, setLastAcademicTitle] = useState("");
const [yearLastAcademicYear, setYearLastAcademicYear] = useState("");
const [graduationDate, setGraduationDate] = useState("");
const [loanAmount, setLoanAmount] = useState("");
const [repaymentPlan, setRepaymentPlan] = useState("");
const [employmentStatus, setEmploymentStatus] = useState("");
const [monthlyIncome, setMonthlyIncome] = useState("");
const [coSigner, setCoSigner] = useState("");

// ✅ Handle Loan Form Submit
const handleSubmit = async  (e) => {
  e.preventDefault();

  const userEmail = localStorage.getItem("userEmail"); // Get userId from localStorage
  if (!userEmail) {
    alert("User ID is missing. Please log in again.");
    return;
  }


  const loanApplicationData = {
    phone,
    address,
    lastAcademicTitle,
    yearLastAcademicYear,
    // graduationDate,
    // loanAmount,
    // repaymentPlan,
    employmentStatus,
    monthlyIncome,
    coSigner,
  };

  // You can send this data to a backend or store in a database
  console.log("Loan Application Data:", loanApplicationData);

  try {
    const response = await axios.put(
      "https://update-user-589432081267.us-central1.run.app",
      { userEmail, loanApplicationData }
    );

    alert("Loan request submitted successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Error submitting loan application:", error);
    alert("Error submitting loan request. Please try again.");
  }

};


  const onLogout = () => {
    // Clear the user info from Redux
    dispatch(setUser(null));
  
      // Clear localStorage or sessionStorage
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
    // Redirect to the login page
    navigate("/signin");
  };

  
  return (
    <>
      <NavbarLoggedIn onLogout={onLogout} />
      <div className="profile-container">
        <h1>Mi Perfil</h1>
        <div className="profile-card">
          {/* Placeholder image until you implement profile picture upload */}
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-pic"
          />
          <h2>{storedUser.name}</h2>
          <p><strong>Email:</strong> {storedUser.email}</p>
       
          <button className="edit-btn" onClick={() => navigate("/edit-profile")}>
            Editar Perfil
          </button>
        </div>

        <h2>Solicitud de Préstamo Estudiantil</h2>
        <form className="loan-form" onSubmit={handleSubmit}>
          <label>Teléfono:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ingresa tu teléfono"
            required
          />
          <label>Dirección:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ingresa tu dirección"
            required
          />
          <label>Ultimo grado académico:</label>
          <input
            type="text"
            value={lastAcademicTitle}
            onChange={(e) => setLastAcademicTitle(e.target.value)}
            placeholder="Licenciatura, postgrado, secundario"
            required
          />
         
          <label>Año de egresado ultimo grado academico:</label>
          <input
            type="text"
            value={yearLastAcademicYear}
            onChange={(e) => setYearLastAcademicYear(e.target.value)}
            placeholder="Año de egresado ultimo grado academico:"
            required
          />
       
          <label>Estado de Empleo:</label>
          <select
            value={employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
            required
          >
            <option value="unemployed">Desempleado</option>
            <option value="part_time">Medio tiempo</option>
            <option value="full_time">Tiempo completo</option>
          </select>
          <label>Ingreso Mensual Comprobable:</label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            placeholder="Ingresa tu ingreso mensual (si aplica)"
          />
          <label>En caso de requerir, tendría co-firmante:</label>
          <input
            type="text"
            value={coSigner}
            onChange={(e) => setCoSigner(e.target.value)}
            placeholder="Nombre del co-firmante"
          />

          <div className="form-footer">
            <label className="check">
              <input
                type="checkbox"
                required
                className="checkIcon"
              />
              Acepto los términos y condiciones del préstamo.
            </label>
          
          
          
            <button type="submit" className="loan-form-submit">
              Enviar Solicitud
            </button>
          </div>

          
        </form>

        <button
          className="loan-form button back-button"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
    </>
  );
};

export default UserProfile;
