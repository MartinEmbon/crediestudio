import { React, useState, useEffect } from "react";
import "../styles/UserProfile.css";
import NavbarLoggedIn from "../NavbarLoggedUser";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Loading state for data fetching
  const [loading, setLoading] = useState(true);

  // Editing state
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;

    const fetchLoanData = async () => {
      try {
        const response = await axios.get(
          `https://list-user-profile-589432081267.us-central1.run.app?email=${userEmail}`
        );
        console.log(response.data.loanApplicationData);
        
        if (response.data && response.data.loanApplicationData) {
          const loanData = response.data.loanApplicationData;

          console.log("Fetched Loan Data:", loanData); // Debug log
          setPhone(loanData.phone || "");
          setAddress(loanData.address || "");
          setLastAcademicTitle(loanData.lastAcademicTitle || "");
          setYearLastAcademicYear(loanData.yearLastAcademicYear || "");
          setEmploymentStatus(loanData.employmentStatus || "");
          setMonthlyIncome(loanData.monthlyIncome || "");
          setCoSigner(loanData.coSigner || "");
          setDateOfBirth(loanData.dateOfBirth || "");
          setCity(loanData.address || "");
          setZipCode(loanData.address || "");

        }
      } catch (error) {
        console.error("Error fetching loan data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchLoanData();
  }, [dispatch]);

  // Get user data from Redux
  const user = useSelector((state) => state.user.userInfo);

  // Fallback: If Redux state is lost, fetch from localStorage
  const storedUser = {
    name: user?.name || localStorage.getItem("userName") || "Usuario Desconocido",
    email: user?.email || localStorage.getItem("userEmail") || "No disponible",
  };

  // Loan Form State
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [lastAcademicTitle, setLastAcademicTitle] = useState("");
  const [yearLastAcademicYear, setYearLastAcademicYear] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [coSigner, setCoSigner] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");


  // Handle Loan Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    const loanApplicationData = {
      phone,
      address,
      city,
      zipCode,
      lastAcademicTitle,
      yearLastAcademicYear,
      employmentStatus,
      monthlyIncome,
      coSigner,
      dateOfBirth
    };

    try {
      const response = await axios.put(
        "https://update-user-589432081267.us-central1.run.app",
        { userEmail, loanApplicationData }
      );

      alert("Loan request submitted successfully!");
      console.log(response.data);

      // Mark profile as complete (this is optional)
      setIsEditing(false); // Close edit mode
    } catch (error) {
      console.error("Error submitting loan application:", error);
      alert("Error submitting loan request. Please try again.");
    }
  };

  const onLogout = () => {
    dispatch(setUser(null));
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <>
      <NavbarLoggedIn onLogout={onLogout} />
      <div className="profile-container">
        <h1>Mi Perfil</h1>

        {loading ? (
          // Show loader while data is loading
          <div className="loader">Cargando...</div>
        ) : (
          // Show Profile Card or Edit Form based on isEditing state
          <>
            {isEditing ? (
              // Show Loan Application Form for editing
              <form className="loan-form" onSubmit={handleSubmit}>
                <label>Teléfono:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <label>Dirección:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />

<label>Ciudad:</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />

<label>Código Postal:</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />

                <label>Último Grado Académico:</label>
                <input
                  type="text"
                  value={lastAcademicTitle}
                  onChange={(e) => setLastAcademicTitle(e.target.value)}
                  required
                />

                <label>Año de Egreso:</label>
                <input
                  type="text"
                  value={yearLastAcademicYear}
                  onChange={(e) => setYearLastAcademicYear(e.target.value)}
                  required
                />

<label> Fecha de Nacimiento:</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
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
                />

                {/* <label>Co-Firmante:</label>
                <input
                  type="text"
                  value={coSigner}
                  onChange={(e) => setCoSigner(e.target.value)}
                /> */}

                <div className="form-footer">
                  {/* <label className="check">
                    <input type="checkbox" required className="checkIcon" />
                    Acepto los términos y condiciones del préstamo.
                  </label> */}
                  <button type="submit" className="loan-form-submit">
                    Actualizar Perfil
                  </button>
                </div>
              </form>
            ) : (
              // Show Profile Card when not editing
              <div className="profile-card">
                <i className="fas fa-user-circle profile-pic"></i>
                <p><strong>Nombre:</strong> {storedUser.name}</p>
                <p><strong>Email:</strong> {storedUser.email}</p>
                <p><strong>Fecha de Nacimiento:</strong> {dateOfBirth}</p>
                <p><strong>Teléfono:</strong> {phone}</p>
                <p><strong>Dirección:</strong> {address}</p>
                <p><strong>Ciudad:</strong> {city}</p>

                <p><strong>Código Postal:</strong> {zipCode}</p>

                <p><strong>Último Grado Académico:</strong> {lastAcademicTitle}</p>
                <p><strong>Año de Egreso:</strong> {yearLastAcademicYear}</p>
                <p><strong>Estado de Empleo:</strong> {employmentStatus}</p>
                <p><strong>Ingreso Mensual:</strong> {monthlyIncome}</p>
                {/* <p><strong>Co-Firmante:</strong> {coSigner}</p> */}
                <button
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Editar Perfil
                </button>
                <button
          className="loan-form button back-button back-to-dash"
          onClick={() => isEditing ? setIsEditing(false) : navigate("/dashboard")}
        >
          {isEditing ? 'Volver' : 'Volver al Dashboard'}
        </button>
              </div>
            )}
          </>
        )}

       
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

export default UserProfile;
