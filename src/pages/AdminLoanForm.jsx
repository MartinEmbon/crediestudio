import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AdminLoanForm.css";
import Footer from "../components/Footer";
import NavbarLoggedAdmin from "../NavbarLoggedAdmin";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import axios from "axios";

const AdminLoanForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { studentName, courseName, studentEmail, requestId, cuit, dni, dateOfBirth, reason, requestedAmount, institution } = location.state || {};

  const initialDiscount = 0;

  const [loanData, setLoanData] = useState({
    requestId: requestId, // Include the request ID
    studentName: studentName || "",
    cuit: cuit || "",
    dni: dni || "",
    dateOfBirth: dateOfBirth || "",
    reason: reason || "",
    requestedAmount: parseFloat(requestedAmount) || 0, // Asegurar que sea un número
    institution: institution || "",

    studentEmail: studentEmail,
    courseName: courseName || "",
    // totalNetPrice: "20000",
    discountApplied: initialDiscount,
    finalPrice: requestedAmount
    ? requestedAmount - (requestedAmount * (initialDiscount / 100))
    : 0,
    paymentDay: 10,
    downPaymentPercentage: 0,
    downPayment: 0,

    installmentValue: requestedAmount
      ? (requestedAmount - (requestedAmount * (50 / 100))) / 3
      : 0, // ✅ Cálculo inicial correcto
    numInstallments: 3,
    interestRate: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoanData((prevData) => {
      // Convert values to numbers where needed
      let updatedData = {
        ...prevData,
        [name]: name === "downPayment" || name === "interestRate" || name === "requestedAmount"
          ? parseFloat(value) || 0  // Convert to number, prevent NaN
          : value
      };

      let requestedAmount = parseFloat(updatedData.requestedAmount) || 0;
      let discountApplied = parseFloat(updatedData.discountApplied) || 0;
      let numInstallments = parseInt(updatedData.numInstallments) || 1; // Avoid division by 0
      let interestRate = parseFloat(updatedData.interestRate) || 0;

      // ✅ Update finalPrice dynamically
      updatedData.finalPrice = requestedAmount - (requestedAmount * (discountApplied / 100));

      // Calculate down payment based on percentage
      updatedData.downPayment = updatedData.finalPrice * (updatedData.downPaymentPercentage / 100);



      // Calculate installment value
      updatedData.installmentValue = (updatedData.finalPrice - updatedData.downPayment) / numInstallments;

      updatedData.interestRate = interestRate;
      return updatedData;
    });
  };


  const calculateInstallmentWithInterest = () => {
    const principal = loanData.finalPrice - loanData.downPayment; // Monto financiado
    if (principal <= 0) return 0; // Si no hay saldo a financiar, cuota 0

    // Convertir la tasa a número
    const interestRate = parseFloat(loanData.interestRate) || 0; // Asegura que sea numérico
    const monthlyRate = interestRate / 100; // Convertir a decimal

    const numInstallments = loanData.numInstallments;

    if (monthlyRate === 0) return principal / numInstallments; // Si no hay interés, cuota normal

    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numInstallments));
  };



  console.log(loanData)
  const handleSubmit = async (e, loanStatus) => {
    e.preventDefault();
    console.log("Guardando datos del crédito:", loanData);

    try {
      // Llamada a la Cloud Function para enviar el email
      await axios.post("https://send-loan-request-response-589432081267.us-central1.run.app", {
        studentEmail: loanData.studentEmail,
        studentName: loanData.studentName,
        courseName: loanData.courseName,
        status: loanStatus === "approved" ? "aprobada" : "rechazada", // ✅ Traducción correcta
      });

      // Llamada a la Cloud Function para actualizar el estado del alumno
      await axios.put("https://update-loanrequest-status-589432081267.us-central1.run.app", {
        studentEmail: loanData.studentEmail,
        newStatus: loanStatus, // ✅ Pasamos "approved" o "rejected"
        requestId: loanData.requestId, // Ensure you have this field

      });

      // 🔹 3. Save full loan data to Firestore (including interest installment)
      await axios.post("https://loand-decission-589432081267.us-central1.run.app", {
        // studentName: loanData.studentName,
        // studentEmail: loanData.studentEmail,
        // courseName: loanData.courseName,
        // finalPrice: Number(loanData.finalPrice),
        // numInstallments: Number(loanData.numInstallments),
        // downPayment: Number(loanData.downPayment),
        // installmentValue: parseFloat(calculateInstallmentWithInterest().toFixed(2)),
        // interestRate: Number(loanData.interestRate),
        // status: loanStatus, // "approved" or "rejected"

        studentName: loanData.studentName,
  studentEmail: loanData.studentEmail,
  dni: loanData.dni,
  cuit: loanData.cuit,
  courseName: loanData.courseName,
  requestedAmount: Number(loanData.requestedAmount),
  discountApplied: Number(loanData.discountApplied),
  finalPrice: Number(loanData.finalPrice),
  downPaymentPercentage: Number(loanData.downPaymentPercentage),
  downPayment: Number(loanData.downPayment),
  numInstallments: Number(loanData.numInstallments),
  interestRate: Number(loanData.interestRate),
  installmentValue: Number(loanData.installmentValue), // sin interés
  installmentValueWithInterest: parseFloat(calculateInstallmentWithInterest().toFixed(2)), // con interés
  totalInstallmentsWithInterest: Number(
    (loanData.downPayment + calculateInstallmentWithInterest() * loanData.numInstallments).toFixed(2)
  ),
  paymentDay: Number(loanData.paymentDay),
  status: loanStatus, // "approved" or "rejected"
  totalLoanAmount: loanData.downPayment + calculateInstallmentWithInterest() * loanData.numInstallments,

      });

      alert(`Estado de crédito actualizado a ${loanStatus} y notificación enviada al alumno.`);
      navigate("/admin-applications"); // Redirigir después de la operación
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error al procesar la solicitud.");
    }
  };

  const onLogout = () => {
    dispatch(setUser(null));
    localStorage.clear();
    navigate("/admin-login");
  };

  return (
    <>
      <NavbarLoggedAdmin onLogout={onLogout} />

      <div className="admin-loan-form-container">
        <div className="admin-loan-form-header">
          <h2>Detalles del Crédito del Estudiante</h2>
        </div>

        <form onSubmit={handleSubmit} className="admin-loan-form">
          {/* 🔹 Información del Estudiante */}
          <div className="loan-info-card">
            <h3>Información del Estudiante</h3>
            <label>Nombre</label>
            <input type="text" name="studentName" value={loanData.studentName} onChange={handleChange} required />

            <label>DNI</label>
            <input type="text" name="dni" value={loanData.dni} onChange={handleChange} required />

            <label>CUIT</label>
            <input type="text" name="cuit" value={loanData.cuit} onChange={handleChange} required />

            <label>Email</label>
            <input type="email" name="studentEmail" value={loanData.studentEmail} onChange={handleChange} required />
          </div>

          {/* 🔹 Detalles del Curso y Pago */}
          <div className="loan-info-card">
            <h3>Detalles del Curso</h3>
            <label>Curso</label>
            <input type="text" name="courseName" value={loanData.courseName} onChange={handleChange} required />

            <label>Subtotal</label>
            <input type="number" name="requestedAmount" value={loanData.requestedAmount} onChange={handleChange} />

            <label>Descuento (%)</label>
            <input type="text" name="discountApplied" value={loanData.discountApplied} onChange={handleChange} />

            <label>Precio Neto Final ($)</label>
            <input
              type="number"
              name="finalPrice"
              value={loanData.finalPrice.toFixed(2)}
              readOnly
            />
            {/* <input type="number" name="finalPrice" value={loanData.finalPrice} onChange={handleChange} required /> */}
          </div>

          {/* 🔹 Plan de Pago */}
          <div className="loan-info-card">
            <h3>Detalles del Pago</h3>
          
            {/* <label>Pago Inicial - Tasa de Apertura ($)</label>
            <input
              type="number"
              name="downPayment"
              value={loanData.downPayment}
              onChange={handleChange}
              required
            /> */}

            <label>Pago Inicial (%)</label>
            <input
              type="number"
              name="downPaymentPercentage"
              value={loanData.downPaymentPercentage}
              onChange={handleChange}
            />

            <label>Pago Inicial ($ calculado)</label>
            <input
              type="number"
              name="downPayment"
              value={loanData.downPayment.toFixed(2)}
              readOnly
            />

            <label>Número de Cuotas</label>
            <input type="number" name="numInstallments" value={loanData.numInstallments} onChange={handleChange} required />

            <label>Tasa de Interés Mensual</label>
            <input type="number" name="interestRate" value={loanData.interestRate} onChange={handleChange} required />

            <label>Plan de Cuotas s/interés</label>
            <input
              type="text"
              name="installmentPlan"
              value={`Pago inicial de $${loanData.downPayment.toFixed(2)} y ${loanData.numInstallments} cuotas de $${loanData.installmentValue.toFixed(2)}`}
              readOnly
            />

        

          </div>

{/* 🔹 Detalles del Curso y Pago */}
<div className="loan-info-card">
            <h3>Resumen</h3>
            <label>Día de Pago</label>
            <input type="number" name="paymentDay" value={loanData.paymentDay} onChange={handleChange} required />
            <label>Plan de Cuotas c/interés</label>
            <input
              type="text"
              name="installmentPlanWithInterest"
              value={`Pago inicial de $${loanData.downPayment.toFixed(2)} y ${loanData.numInstallments} cuotas de $${calculateInstallmentWithInterest().toFixed(2)}`}
              readOnly
            />

            <label>Total a pagar en cuotas con interés</label>
            <input
              type="text"
              name="totalInstallmentsWithInterest"
              value={`$${(loanData.downPayment + (calculateInstallmentWithInterest() * loanData.numInstallments)).toFixed(2)}`}
              readOnly
            />
          </div>



          <div className="group-btn">

            {/* <button type="submit" className="submit-btn">Guardar</button> */}
            <button type="button" className="submit-btn" onClick={(e) => handleSubmit(e, "approved")}>
              Aprobar Crédito
            </button>

            <button type="button" className="reject-btn" onClick={(e) => handleSubmit(e, "rejected")}>
              Rechazar Crédito
            </button>
          </div>


        </form>

        <button className="back-button-admin" onClick={() => navigate("/admin-applications")}>Volver</button>
        <div style={{ marginTop: '20px' }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminLoanForm;