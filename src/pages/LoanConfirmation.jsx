import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/LoanConfirmation.css";  // Import the new CSS file

const LoanConfirmation = () => {
  const user = useSelector((state) => state.user.userInfo);
  console.log(user);  // Check if user is populated correctly

  const navigate = useNavigate();

  return (
    <div className="container">
      <header className="header">
        <h1>Confirmación de Solicitud de Crédito</h1>
      </header>
      <main className="main">
        <h2>¡Tu solicitud de crédito ha sido {user?.status}!</h2>
        <p>Detalles de la solicitud:</p>
        <ul className="details-list">
          <li><strong>Nombre:</strong> {user?.fullName}</li>
          <li><strong>DNI / Número de Identificación:</strong> {user?.dni}</li>
          <li><strong>Fecha de Nacimiento:</strong> {user?.dateOfBirth}</li>
          <li><strong>Monto solicitado:</strong> ${user?.requestedAmount}</li>
          <li><strong>Plan de pago:</strong> {user?.paymentPlan} cuotas</li>
          <li><strong>Motivo de la solicitud:</strong> {user?.reason}</li>
          <li><strong>Institución:</strong> {user?.institution}</li>
          <li><strong>Curso:</strong> {user?.course}</li>
        </ul>

        {user?.status === "Aprobada" ? (
          <>
            <p>¡Enhorabuena! Tu solicitud ha sido aprobada.</p>
            <p>Hemos enviado el contrato a tu correo electrónico. Por favor, revisa tu bandeja de entrada y firma el contrato digitalmente para completar el proceso.</p>

            <h3>Próximos Pasos:</h3>
            <ol>
              <li>Firma el contrato digitalmente.</li>
              <li>Descarga tu boleta desde tu correo electrónico.</li>
              <li>Una vez que el pago sea compensado por el banco, estarás matriculado en tu curso.</li>
            </ol>

            <button onClick={() => navigate("/dashboard")}>Ir a mi panel</button>
          </>
        ) : (
          <p>Tu solicitud está en espera de revisión. Te notificaremos pronto.</p>
        )}
      </main>
    </div>
  );
};

export default LoanConfirmation;
