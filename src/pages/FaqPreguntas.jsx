import "../styles/FaqPreguntas.css"; // Asegurate de tener este archivo CSS
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { requestLoan } from "../api/loanAPI";
// import institutionsData from "../data/institutions.json";
import "../styles/LoanRequest.css";
import NavbarLoggedIn from "../NavbarLoggedUser";
import axios from 'axios';
import Footer from "../components/Footer";
const preguntasFrecuentes = [
  {
    question: "¿Cuánto tiempo tarda la aprobación del préstamo?",
    answer: "El análisis de tu solicitud demora hasta 24 horas hábiles. Una vez aprobado, recibirás la notificación por email.",
  },
  {
    question: "¿Qué documentación necesito presentar?",
    answer: "Solo necesitás completar el formulario de solicitud y aguardar el análisis. Eventualmente, podremos solicitar que anexes alguna documentación",
  },
  {
    question: "¿Cómo se realiza el pago del préstamo?",
    answer: "Podés pagar en cuotas mensuales a través de débito automático o transferencia bancaria.",
  },
  {
    question: "¿Quién puede solicitar un préstamo?",
    answer: "Estudiantes de instituciones asociadas, mayores de 18 años, residentes en Argentina y con CBU a su nombre.",
  },
  {
    question: "¿Cómo sé si mi solicitud fue aprobada?",
    answer: "Recibirás un correo electrónico con la aprobación y los próximos pasos. También podés hacer el seguimiento desde tu panel.",
  },
  {
    question: "¿Qué es la firma digital?",
    answer: "Es la forma de firmar tu contrato de forma online, con total validez legal, sin necesidad de imprimir nada.",
  },
  {
    question: "¿Cuándo empiezo a pagar las cuotas?",
    answer: "La primera cuota vence un mes después de la aprobación del préstamo, y luego son mensuales.",
  },
  {
    question: "¿Puedo adelantar cuotas o pagar el préstamo completo antes?",
    answer: "Sí, podés adelantar cuotas o cancelar el total sin penalidad. Solo tenés que avisarnos por email.",
  },
  {
    question: "¿Qué pasa si no puedo pagar una cuota?",
    answer: "Es importante que nos contactes antes del vencimiento para buscar una solución juntos. Hay opciones de reprogramación.",
  },
  {
    question: "¿Qué tasas se aplican?",
    answer: "La tasa de interés varía según el plazo y el perfil del solicitante. Todos los detalles están en el simulador antes de confirmar.",
  },
];

const FaqPreguntas = () => {
  const [openIndex, setOpenIndex] = useState(null);
 const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);
  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
 const onLogout = () => {
    dispatch(setUser(null));
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <>
    <NavbarLoggedIn onLogout={onLogout}/>
  
    <div className="faq-section">
      <h2>Preguntas Frecuentes</h2>
      {preguntasFrecuentes.map((item, index) => (
        <div key={index} className="faq-item">
          <button
            className="faq-question"
            onClick={() => toggleAnswer(index)}
          >
            {item.question}
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </button>
          <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
    <button className="back-to-institution-dash" onClick={() => navigate(-1)}>
                    Volver
                </button>
    <Footer/>
    </>
  );
};

export default FaqPreguntas;
