import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarLoggedIn from "../NavbarLoggedUser";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import "../styles/CourseSummary.css";
import Footer from "../components/Footer";
import axios from "axios"; // Make sure you have this at the top
import { useLocation } from "react-router-dom";
import { addDays, addMonths, setDate, format } from "date-fns";

const CourseSummary = () => {
  const location = useLocation()
  // Create the full schedule dynamically

  const [courseData, setCourseData] = useState(location.state?.course || null);


  const userData = useSelector((state) => state.user.userInfo);
  const userInfo = userData?.userInfo;  
  const [paymentSchedule, setPaymentSchedule] = useState([]);

  // const [courseData, setCourseData] = useState(null);
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(setUser(null));
    navigate("/signin");
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `https://get-loan-decissions-589432081267.us-central1.run.app`,
          {
            params: {
              studentEmail: userInfo.email,
            },
          }
        );
  
        const loans = response.data;
        console.log("✅ Loans data retrieved from backend:", loans);
  
        if (loans.length > 0) {
          setCourseData(loans[0]);
  
          const nextPaymentDate = new Date(loans[0].nextPaymentDate);
          const currentDate = new Date();
          const diffDays = Math.ceil((nextPaymentDate - currentDate) / (1000 * 3600 * 24));
  
          if (diffDays <= 7) {
            toast.info(`¡Tu próxima cuota de ${loans[0].nextPaymentAmount} es en ${diffDays} días!`);
          }
        } else {
          toast.warn("No se encontraron préstamos asociados a este usuario.");
        }
      } catch (error) {
        console.error("❌ Error fetching loan data:", error);
        toast.error("Hubo un error al recuperar la información del curso.");
      }
    };
  
    if (userInfo && userInfo.email) {
      console.log("✅ Email found:", userInfo.email);
  } else {
      console.warn("⚠️ No userInfo.email available yet.");
  }
  }, [userInfo]); // ✅ Add the email as a dependency
  

  // const paymentSchedule = [];

  useEffect(() => {
    if (courseData?.decisionDate && courseData?.numInstallments) {
      let decisionDate;
  
      // ✅ Convert Firestore timestamp to JS Date
      if (
        courseData.decisionDate &&
        typeof courseData.decisionDate === "object" &&
        courseData.decisionDate._seconds
      ) {
        decisionDate = new Date(courseData.decisionDate._seconds * 1000);
      } else {
        decisionDate = new Date(courseData.decisionDate);
      }
      
  
      if (!isNaN(decisionDate.getTime())) {
        const schedule = [];
  
        // 🔹 Pago inicial (día siguiente a la decisión)
        const downPaymentDate = addDays(decisionDate, 1);
        schedule.push({
          concept: "Anticipo",
          date: format(addDays(decisionDate, 1), "dd/MM/yyyy"),
          amount: Number(courseData.downPayment).toFixed(2),
          status: "⏳ Pendiente",
        });
  
        // 🔹 Cuotas mensuales (cada 10 del mes, empezando el mes siguiente)
        const monthlyAmount = courseData.installmentValueWithInterest || 0;
        // const monthlyAmount = courseData.installmentValue || 0;

        
          for (let i = 0; i < courseData.numInstallments; i++) {
            const monthDate = addMonths(decisionDate, i + 1);
            const dueDate = setDate(monthDate, 10); // sets to 10th of the month
          
            schedule.push({
              concept: "Cuota mensual",
              date: format(dueDate, "dd/MM/yyyy"),
              amount: monthlyAmount.toFixed(2),
              status: "⏳ Pendiente",
            });
        }
  
        setPaymentSchedule(schedule);
      } else {
        console.warn("⚠️ Fecha inválida:", courseData.decisionDate);
      }
    }
  }, [courseData]);
  

  const handlePayment = () => {
    alert("Redirigiendo al sistema de pago...");
  };

  return (
    <>
      <NavbarLoggedIn onLogout={onLogout} />
      <div className="course-summary-container">
        <header className="course-summary-header">
          <h1>Resumen del Crédito</h1>
        </header>
        
        <main className="course-summary-main">
  {courseData ? (
    <>
      {/* 🔹 Resumen del Crédito */}
      <section className="credit-summary-card">
      <h2>{courseData?.courseName || "Nombre del curso no disponible"}</h2>
      <p><strong>📌 Monto total:</strong> ${courseData.totalLoanAmount.toFixed(2)}</p>
        <p><strong>💰 Tasa de interés:</strong> {courseData.interestRate}</p>
        <p><strong>📅 Plazo:</strong> {courseData.numInstallments} meses</p>
        <p><strong>🧾 Valor de cuota:</strong> {courseData.installmentValueWithInterest}</p>
        {paymentSchedule.length > 1 && (
  <>
    <p><strong>🟢 Inicio del financiamiento:</strong> {
      paymentSchedule.find(p => p.concept === "Cuota mensual")?.date
    }</p>
    <p><strong>🔴 Fin del financiamiento:</strong> {
      [...paymentSchedule].reverse().find(p => p.concept === "Cuota mensual")?.date
    }</p>
  </>
)}


        {/* <p><strong>💳 Lo que has pagado:</strong> ${courseData.paidAmount}</p>
        <p><strong>🔻 Saldo pendiente:</strong> ${courseData.totalPrice - courseData.paidAmount}</p> */}

{/* ✅ Descargar contrato button */}
<button
    className="download-contract-button pay-button"
    onClick={() => window.open(courseData.contractUrl || "#", "_blank")}
  >
    📄 Descargar Contrato
  </button>      </section>

      {/* 🔹 Cronograma de Pagos */}
      <section className="payment-schedule">
        <h3>📅 Cronograma de Pagos</h3>
        <table className="payment-schedule-table">
          <thead>
            <tr>
            <th>Concepto</th>

              <th>Fecha</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {paymentSchedule.length > 0 ? (
  paymentSchedule.map((payment, index) => (
                <tr key={index}>
                        <td>{payment.concept}</td>

                  <td>{payment.date}</td>
                  <td>${payment.amount}</td>
                  <td>
        {payment.status === "⏳ Pendiente" ? (
          (() => {
            const dueDate = new Date(payment.date.split("/").reverse().join("-"));
            const today = new Date();
            const diffDays = Math.ceil((dueDate - today) / (1000 * 3600 * 24));
            return diffDays >= 0
              ? `⏳ Pendiente (${diffDays} días)`
              : `❌ Vencido (${Math.abs(diffDays)} días)`;
          })()
        ) : (
          payment.status
        )}
      </td>
      <td>
        {payment.status === "⏳ Pendiente" ? (
          <button className="pay-now-btn" onClick={handlePayment}>Pagar</button>
        ) : (
          <button className="view-receipt-btn">Ver Recibo</button>
        )}
      </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay pagos programados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* 🔹 Historial de Pagos */}
     
    </>
  ) : (
    <p>Cargando información del curso...</p>
  )}

<button
          className="loan-form button back-button back-to-dash"
          onClick={() => navigate(-1)}
        >Volver
        </button>
</main>


        
        <ToastContainer />
      </div>

      <Footer/>
    </>
  );
};

export default CourseSummary;
