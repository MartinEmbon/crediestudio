import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importar estilo de notificaciones
import NavbarLoggedIn from "../NavbarLoggedUser";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import "../styles/CourseSummary.css"

const CourseSummary = () => {
  // Simulación de datos obtenidos desde la API o Redux
  const [courseData, setCourseData] = useState(null);
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(setUser (null)); // Clear user info from Redux
    navigate("/signin"); // Redirect to login page
  };

  // Simulación de datos del curso y pagos realizados
  useEffect(() => {
    const mockCourseData = {
      courseName: "Curso de Desarrollo Web",
      totalPrice: 500,
      totalQuotas: 5,
      paidAmount: 200,
      quotasPaid: 2,
      quotasRemaining: 3,
      paymentHistory: [
        { date: "2025-03-01", amount: 100, method: "Tarjeta de Crédito", receipt: "REC123" },
        { date: "2025-03-15", amount: 100, method: "Transferencia", receipt: "REC124" },
      ],
      nextPaymentDate: "2025-04-01",
      nextPaymentAmount: 100,
    };
    setCourseData(mockCourseData);

    // Notificación cuando la próxima cuota está cerca
    const nextPaymentDate = new Date(mockCourseData.nextPaymentDate);
    const currentDate = new Date();
    const diffDays = Math.ceil((nextPaymentDate - currentDate) / (1000 * 3600 * 24));

    if (diffDays <= 7) {
      toast.info(`¡Recuerda que tu próxima cuota de ${mockCourseData.nextPaymentAmount} es en ${diffDays} días!`);
    }
  }, []);

  const remainingAmount = courseData ? courseData.totalPrice - courseData.paidAmount : 0;
  const remainingQuotas = courseData ? courseData.quotasRemaining : 0;

  const handlePayment = () => {
    alert("Redirigiendo al sistema de pago...");
    // Aquí deberías integrar el flujo de pago con la API o el sistema de pagos.
  };

  return (
    <>
      <NavbarLoggedIn onLogout={onLogout} />
      <div className="course-summary-container">
        <header className="course-summary-header">
          <h1>Resumen de tu Curso</h1>
        </header>
        <main className="course-summary-main">
          {courseData ? (
            <>
              <h2>{courseData.courseName}</h2>
              <div className="summary-details">
                <p><strong>Precio total:</strong> ${courseData.totalPrice}</p>
                <p><strong>Cuotas restantes:</strong> {remainingQuotas}</p>
                <p><strong>Lo que has pagado hasta el momento:</strong> ${courseData.paidAmount}</p>
                <p><strong>Restante por pagar:</strong> ${remainingAmount}</p>
              </div>

              <h3>Historial de Pagos</h3>
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

              <h3>Próxima Cuota</h3>
              <p><strong>Fecha:</strong> {courseData.nextPaymentDate}</p>
              <p><strong>Monto:</strong> ${courseData.nextPaymentAmount}</p>
              <div className="button-container">
                <button className="back-button course-summary-back-to-dash" onClick={() => navigate(-1)}>Volver</button>
                <button className="pay-button" onClick={handlePayment}>Pagar Próxima Cuota</button>
              </div>
            </>
          ) : (
            <p>Cargando información del curso...</p>
          )}
        </main>

        <ToastContainer />
      </div>

      <footer className="home-footer">
        <p>&copy; 2025 Educación Plus | Todos los derechos reservados.</p>
      </footer>
    </>
  );
};

// const styles = {
//   container: {
//     fontFamily: "Arial, sans-serif",
//     textAlign: "center",
//     padding: "20px",
//   },
//   header: {
//     marginBottom: "30px",
//   },
//   main: {
//     marginTop: "30px",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "20px",
//   },
//   th: {
//     padding: "10px",
//     borderBottom: "1px solid #ccc",
//   },
//   td: {
//     padding: "10px",
//     borderBottom: "1px solid #ccc",
//   },
//   payButton: {
//     backgroundColor: "#4CAF50",
//     color: "white",
//     padding: "10px 20px",
//     fontSize: "16px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "20px",
//   }
  
// };

export default CourseSummary;
