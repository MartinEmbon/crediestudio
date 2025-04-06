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

const CourseSummary = () => {
  const userData = useSelector((state) => state.user.userInfo);
  const userInfo = userData?.userInfo;  
  const [courseData, setCourseData] = useState(null);
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(setUser(null));
    navigate("/signin");
  };

  // useEffect(() => {
  //   const mockCourseData = {
  //     courseName: "Curso de Desarrollo Web",
  //     totalPrice: 500,
  //     interestRate: "10%",
  //     termMonths: 6,
  //     paidAmount: 200,
  //     quotasPaid: 2,
  //     quotasRemaining: 3,
  //     nextPaymentDate: "2025-04-01",
  //     nextPaymentAmount: 100,
  //     paymentSchedule: [
  //       { date: "2025-03-01", amount: 100, status: "✅ Pagado" },
  //       { date: "2025-03-15", amount: 100, status: "✅ Pagado" },
  //       { date: "2025-04-01", amount: 100, status: "⏳ Pendiente" },
  //       { date: "2025-05-01", amount: 100, status: "⏳ Pendiente" },
  //       { date: "2025-06-01", amount: 100, status: "⏳ Pendiente" },
  //     ],
  //     paymentHistory: [
  //       { date: "2025-03-01", amount: 100, method: "Tarjeta de Crédito", receipt: "REC123" },
  //       { date: "2025-03-15", amount: 100, method: "Transferencia", receipt: "REC124" },
  //     ],
  //   };
  //   setCourseData(mockCourseData);

  //   const nextPaymentDate = new Date(mockCourseData.nextPaymentDate);
  //   const currentDate = new Date();
  //   const diffDays = Math.ceil((nextPaymentDate - currentDate) / (1000 * 3600 * 24));

  //   if (diffDays <= 7) {
  //     toast.info(`¡Tu próxima cuota de ${mockCourseData.nextPaymentAmount} es en ${diffDays} días!`);
  //   }
  // }, []);
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
      <p><strong>📌 Monto total:</strong> ${courseData.finalPrice}</p>
        <p><strong>💰 Tasa de interés:</strong> {courseData.interestRate}</p>
        <p><strong>📅 Plazo:</strong> {courseData.numInstallments} meses</p>
        <p><strong>💳 Lo que has pagado:</strong> ${courseData.paidAmount}</p>
        <p><strong>🔻 Saldo pendiente:</strong> ${courseData.totalPrice - courseData.paidAmount}</p>
        <button className="pay-button" onClick={handlePayment}>Pagar Ahora</button>
      </section>

      {/* 🔹 Cronograma de Pagos */}
      <section className="payment-schedule">
        <h3>📅 Cronograma de Pagos</h3>
        <table className="payment-schedule-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courseData?.paymentSchedule?.length > 0 ? (
              courseData.paymentSchedule.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.date}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.status}</td>
                  <td>
                    {payment.status === "⏳ Pendiente" && (
                      <button className="pay-now-btn" onClick={handlePayment}>Pagar</button>
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
      <section className="payment-history">
        <h3>💳 Historial de Pagos</h3>
        {courseData?.paymentHistory?.length > 0 ? (
          <table className="payment-history-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Método de Pago</th>
                <th>Recibo</th>
              </tr>
            </thead>
            <tbody>
              {courseData.paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.date}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.method}</td>
                  <td>{payment.receipt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay pagos registrados aún.</p>
        )}
      </section>
    </>
  ) : (
    <p>Cargando información del curso...</p>
  )}

<button
          className="loan-form button back-button back-to-dash"
          onClick={() => navigate("/dashboard")}
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
